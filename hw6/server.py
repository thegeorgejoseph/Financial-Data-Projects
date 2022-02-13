from curses import start_color
from flask import Flask, Request, jsonify,request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import json
import requests
from dateutil.relativedelta import relativedelta
from datetime import *
import time

app = Flask(__name__)
CORS(app)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
mock_ticker = "AAPL"

response = {}

@app.route("/search",methods = ['GET'])
@cross_origin(supports_credentials=True)
def finnhubRouter():
    ticker = request.args.get("text")
    companyInfo = companyURL2API(ticker)
    response["Profile"] = companyInfo
    quoteInfo = quoteAPI(ticker)
    quoteInfo["Stock Ticker Symbol"] = companyInfo["Stock Ticker Symbol"]
    response["Quote"] = quoteInfo
    recommendationInfo = recommendationAPI(ticker)
    response["Recommendation"] = recommendationInfo
    response["Charts"] = highchartsAPI(ticker)
    newsList = latestNewsAPI(ticker)
    response["News"] = newsList
    res = jsonify(response)
    return res

def companyURL2API(TICKER):
    addonString = f"stock/profile2?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL+addonString)
    res = req.json()
    companyInfo = {}
    companyInfo["logo"] = res["logo"]
    companyInfo["Company Name"] = res["name"]
    companyInfo["Stock Ticker Symbol"] = res["ticker"]
    companyInfo["Company IPO Date"] = res["exchange"]
    companyInfo["Category"] = res["finnhubIndustry"]
    
      
    return companyInfo


def quoteAPI(TICKER):
    addonString = f"quote?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL+addonString)
    res = req.json()
    quoteResponse = {}
    quoteResponse["Stock Ticker Symbol"] = ""
    quoteResponse["Trading Day"] = res["t"]
    quoteResponse["Previous Closing Price"] = res["pc"]
    quoteResponse["Opening Price"] = res["o"]
    quoteResponse["Opening Price"] = res["o"]
    quoteResponse["High Price"] = res["h"]
    quoteResponse["Low Price"] = res["l"]
    quoteResponse["Change"] = res["d"]
    quoteResponse["Change Percent"] = res["dp"]
    
    return quoteResponse

def recommendationAPI(TICKER):
    addonString = f"stock/recommendation?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    recommendation = {}
    recommendation["buy"] = res[0]["buy"]
    recommendation["sell"] = res[0]["sell"]
    recommendation["hold"] = res[0]["hold"]
    recommendation["strongBuy"] = res[0]["strongBuy"]
    recommendation["strongSell"] = res[0]["strongSell"]
    recommendation["IsLatest"] = res[0]["period"] > res[1]["period"]
    
    return recommendation

def highchartsAPI(TICKER):
    charts = {}
    now = datetime.now()
    today = int(time.mktime(now.timetuple()))
    temp = now + relativedelta(months=-6)
    six_month_ago = int(time.mktime(temp.timetuple()))
    addonString = f"stock/candle?symbol={TICKER}&resolution=D&from={six_month_ago}&to={today}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    charts["Date"] = res["t"]
    charts["Stock Price"] = res["c"]
    charts["Volume"] = res["v"]
    
    return charts

def latestNewsAPI(TICKER):
    news = []
    now = datetime.now()
    today = now.strftime('%Y-%m-%d')
    temp = now + relativedelta(months=-1)
    one_month_ago = temp.strftime('%Y-%m-%d')
    addonString = f"company-news?symbol={TICKER}&from={one_month_ago}&to={today}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    for obj in res:
        news.append({"Image":obj["image"],"Title":obj["headline"],"Date":obj["datetime"],"Link to Original Post": obj["url"]})
    return news
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81,debug=True)