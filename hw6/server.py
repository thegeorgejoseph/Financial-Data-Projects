from flask import Flask

app = Flask(__name__)

@app.route("/search",methods = ['GET'])
def finnhubRouter():
    pass


if __name__ == "__main__":
    app.run()