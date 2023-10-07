from langchain.llms import OpenAI

OPENAI_API = "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"


llm = OpenAI(model_name="text-davinci-003", openai_api_key=OPENAI_API)
msg = llm("explain large language models in one sentance")
print(msg)

