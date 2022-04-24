//
//  ChartsWebView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/24/22.
//

import SwiftUI
import WebKit

class Coordinator : NSObject, WKNavigationDelegate {
    // ... any other code
    let temp: String = "passing data into javascript functionality works and now only the functionality for getting the highcharts charts to render in the webview remains!"
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        webView.evaluateJavaScript("temporaryFunc(\"\(temp)\")", completionHandler: { (value, error) in
            // .. do anything needed with result, if any
        })
    }
}

struct WebView: UIViewRepresentable{
    let htmlName : String
    private let webView = WKWebView()
    
    func makeUIView(context: Context) -> some UIView {
        webView.navigationDelegate = context.coordinator
        return webView
    }
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        webView.load(htmlName)
    }
}

extension WKWebView {
    func load(_ htmlName : String){
        guard !htmlName.isEmpty else {
            return print("Empty file name")
        }
        
        guard let filePath = Bundle.main.path(forResource: htmlName, ofType: "html") else{
            return print("File path error probably")
        }
        
        do{
            let htmlString = try String(contentsOfFile: filePath, encoding: .utf8)
            loadHTMLString(htmlString, baseURL: URL(fileURLWithPath: filePath))
        } catch {
            print("Extension error occured")
        }
    }
}

struct ChartsWebView: View {
    @Binding var stringName: String
    var body: some View {
        let fileName: String? = nil
        WebView(htmlName: fileName!)
    }
}

struct ChartsWebView_Previews: PreviewProvider {
    static var previews: some View {
        WebView(htmlName: "index")
    }
}
