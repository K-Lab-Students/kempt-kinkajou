import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools.base import StructuredTool
from typing import Optional
import requests

OPENAI_API = "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"

# ONPU AGW
AGW_PORT = 3000
AGW_HOST = 'localhost'
AGW_URL = f"http://{AGW_HOST}:{AGW_PORT}/"

def fetch_get_devices(params={}):
    try:
        response = requests.post(AGW_URL + 'api/matrix/get', json=params)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return None

def get_devices_insight() -> str:
  """Tool that counts the number of items for a given Laboratory Brains data object"""
  data = fetch_get_devices()
  # return str(len(data))
  return data

device_insights_tool = StructuredTool.from_function(get_devices_insight)

chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.2, openai_api_key=OPENAI_API)

tools = [device_insights_tool]
agent_chain = initialize_agent(
  tools,
  chat,
  agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
  verbose=True
)

print(agent_chain("how many devices with online status?"))
