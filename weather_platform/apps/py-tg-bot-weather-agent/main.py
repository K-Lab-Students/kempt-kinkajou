import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType, AgentOutputParser
from typing import List, Union
from langchain.schema import AgentAction, AgentFinish, OutputParserException
from langchain.tools.base import StructuredTool
from typing import Optional
import requests
import telebot

OPENAI_API = "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"

BOT_KEY = '6415742729:AAHVyDkHHF57ZsVd9gJjVtXjKE2M9CydzPk'

WELCOME_MSG = """"
Привет! ✨ Мы K-Lab, Команда, занимающаяся разработкой роботов 🤖 и машинным обучением и мы рады видеть тебя в нашей системе управления метеоданными!
Спроси что-нибудь у нашего бота 🙂
"""

# Weather AGW
AGW_PORT = 8045
AGW_HOST = 'localhost'
AGW_URL = f"http://{AGW_HOST}:{AGW_PORT}/"

bot = telebot.TeleBot(BOT_KEY)

def fetch_get_sensors(params={}):
    try:
        response = requests.post(AGW_URL + 'api/v1/sensors/get-with-params', json=params)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return None

def fetch_get_agregator(params={}):
    try:
        response = requests.post(AGW_URL + 'api/v1/agregator/get-with-params', json=params)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return None

def fetch_get_weather_data(params={}):
    try:
        response = requests.get(AGW_URL + 'api/v1/measures/get-for-ai')
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return None

def get_sensors_insight() -> str:
  """Tool that using for get meteo weather sensors"""
  data = fetch_get_sensors()
  return data

def get_agregators_insight() -> str:
  """Tool that using for get meteo weather sensors"""
  data = fetch_get_agregator()
  return data

def get_weather_data_history_insight() -> str:
  """Tool that using for get meteo weather history from sensors using in the meteo system"""
  data = fetch_get_weather_data()
  return data

sensors_insights_tool = StructuredTool.from_function(get_sensors_insight)
agregators_insights_tool = StructuredTool.from_function(get_agregators_insight)
weather_history_insights_tool = StructuredTool.from_function(get_weather_data_history_insight)

chat = ChatOpenAI(model_name="gpt-3.5-turbo-16k", temperature=0.2, openai_api_key=OPENAI_API)

tools = [sensors_insights_tool, agregators_insights_tool, weather_history_insights_tool]

class CustomOutputParser(AgentOutputParser):
    def parse(self, llm_output: str) -> Union[AgentAction, AgentFinish]:
        # Check if agent should finish
        if "Final Answer:" in llm_output:
            final_answer = llm_output.split("Final Answer:")[-1].strip()
            print("final is - " + final_answer)
            return AgentFinish(
                return_values={"output": final_answer},
                log=llm_output,
            )
        # Parse out the action and action input
        regex = r"Action\s*\d*\s*:(.*?)\nAction\s*\d*\s*Input\s*\d*\s*:[\s]*(.*)"
        match = re.search(regex, llm_output, re.DOTALL)
        if not match:
            raise ValueError(f"Could not parse LLM output: `{llm_output}`")
        action = match.group(1).strip()
        action_input = match.group(2)
        # Return the action and action input
        return AgentAction(
            tool=action, tool_input=action_input.strip(" ").strip('"'), log=llm_output
        )

output_parser = CustomOutputParser()

agent_chain = initialize_agent(
  tools,
  chat,
  max_iterations=3,
  agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
  verbose=True,
  output_parser=output_parser
)

# print(get_weather_data_history_insight())

@bot.message_handler(commands=['start', 'hello'])
def send_welcome(message):
    bot.reply_to(message, WELCOME_MSG)

@bot.message_handler(func=lambda msg: True)
def echo_all(message):
  user_id = message.from_user.id
  print(message.text)
  bot.reply_to(message, "AI думает... 🤔")

  result = agent_chain(message.text)
  if (result):
    final_answer = result['output']
    print(final_answer)

    bot.reply_to(message, str(final_answer))


bot.infinity_polling()
