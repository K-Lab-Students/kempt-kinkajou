from langchain.schema import (AIMessage, HumanMessage, SystemMessage)
from langchain.chat_models import ChatOpenAI

OPENAI_API = "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"



chat = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0.3, openai_api_key=OPENAI_API)
messages = [
  SystemMessage(content="You are an expert data scientist and neuroscience"),
  HumanMessage(content="объясни как выполняется сортировка входных данных в таламусе человека по шагам")
]
response=chat(messages)
print(response.content, end='\n')

