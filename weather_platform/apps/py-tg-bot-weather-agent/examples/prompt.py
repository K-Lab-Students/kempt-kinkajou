from langchain.llms import OpenAI
from langchain import PromptTemplate

OPENAI_API = "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"

template = """
You are an expert data scientist with an expertise in building deep learning models.
Explain the concept of {concept} in a couple of lines
"""

prompt = PromptTemplate(
  input_variables=['concept'],
  template=template,
)

llm = OpenAI(model_name="text-davinci-003", openai_api_key=OPENAI_API)
msg = llm(prompt.format(concept="regularization"))
print(msg)
