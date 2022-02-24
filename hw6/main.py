from curses import start_color
from flask import Flask, Request, jsonify,request,send_from_directory
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

@app.route("/",methods = ['GET'])
@cross_origin(supports_credentials=True)
def index():
    return send_from_directory("templates","index.html")

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

@app.route("/profile",methods = ['GET'])
@cross_origin(supports_credentials=True)
def companyURL2API():
    TICKER = request.args.get("text")
    addonString = f"stock/profile2?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL+addonString)
    res = req.json()
    companyInfo = {}
    companyInfo["logo"] = res["logo"]
    companyInfo["Company Name"] = res["name"]
    companyInfo["Stock Ticker Symbol"] = res["ticker"]
    companyInfo["IPO"] = res["ipo"]
    companyInfo["Stock Exchange Code"] = res["exchange"]
    companyInfo["Category"] = res["finnhubIndustry"]
    res = jsonify({"Profile": companyInfo})
    return res

@app.route("/quote",methods = ['GET'])
@cross_origin(supports_credentials=True)
def quoteAPI():
    TICKER = request.args.get("text")
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
    res = jsonify({"Quote": quoteResponse})
    return res

@app.route("/recommendation",methods = ['GET'])
@cross_origin(supports_credentials=True)
def recommendationAPI():
    TICKER = request.args.get("text")
    addonString = f"stock/recommendation?symbol={TICKER}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    recommendation = {}
    if len(res) == 0:
        res = {}
        res[0] = {}
        res[1] = {}
        res[0]["buy"] = "N.A"
        res[0]["sell"] = "N.A"
        res[0]["hold"] = "N.A"
        res[0]["strongBuy"] = "N.A"
        res[0]["strongSell"] = "N.A"
        res[0]["period"] = 2
        res[1]["period"] = 1
    recommendation["buy"] = res[0]["buy"]
    recommendation["sell"] = res[0]["sell"]
    recommendation["hold"] = res[0]["hold"]
    recommendation["strongBuy"] = res[0]["strongBuy"]
    recommendation["strongSell"] = res[0]["strongSell"]
    recommendation["IsLatest"] = res[0]["period"] > res[1]["period"]
    res = jsonify({"Recommendation":recommendation})
    return res

@app.route("/charts",methods = ['GET'])
@cross_origin(supports_credentials=True)
def highchartsAPI():
    TICKER = request.args.get("text")
    charts = {}
    now = datetime.now()
    today = int(time.mktime(now.timetuple()))
    temp = now + relativedelta(months=-6,days=1)
    six_month_ago = int(time.mktime(temp.timetuple()))
    addonString = f"stock/candle?symbol={TICKER}&resolution=D&from={six_month_ago}&to={today}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    charts["Date"] = res["t"]
    charts["Stock Price"] = res["c"]
    charts["Volume"] = res["v"]
    res = jsonify({"Charts":charts})
    return res

@app.route("/news",methods = ['GET'])
@cross_origin(supports_credentials=True)
def latestNewsAPI():
    TICKER = request.args.get("text")
    news = []
    now = datetime.now()
    today = now.strftime('%Y-%m-%d')
    temp = now + relativedelta(months=-1)
    one_month_ago = temp.strftime('%Y-%m-%d')
    addonString = f"company-news?symbol={TICKER}&from={one_month_ago}&to={today}&token={API_KEY}"
    req = requests.get(BASE_URL + addonString)
    res = req.json()
    count = 1
    for obj in res:
        if count == 6:
            break
        if obj["image"] == '' or obj["headline"] == '' or obj["datetime"] == '' or obj["url"] == '':
            continue
        news.append({"Image":obj["image"],"Title":obj["headline"],"Date":obj["datetime"],"Link to Original Post": obj["url"]})
        count += 1
    res = jsonify({"News":news})
    return res

if __name__ == "__main__":
    app.run(port=8080)