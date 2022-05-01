//
//  TradingSheetView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import SwiftUI

struct TradingSheetView: View {
    @EnvironmentObject var localStorage: LocalStorage
//    @Environment(\.dismiss) var dismiss
    @Binding var stock: Stock
    @State private var input: String = ""
    @State var didBuy: Bool = false
    @State private var showToast: Bool = false
    @State var toastString: String = ""
    @ObservedObject var modalState: ModalState
    var body: some View {
//        print(Self._printChanges())
//        return Text("What could possibly go wrong?")
        VStack(alignment: .leading, spacing: 10){
            HStack{
                Spacer()
                Image(systemName: "xmark")
                    .onTapGesture{
                        self.modalState.isModal1Presented = false
                    }
                    .foregroundColor(Color.gray)
            }
            HStack{
                Spacer()
                Text("Trade \(stock.name) shares")
                    .font(.headline.weight(.bold))
                Spacer()
            }
            Spacer()
            HStack{
                TextField("0", text: $input)
                    .frame(width: 250, height: 100, alignment: .leading)
                    .padding()
                    .font(Font.system(size: 80, design: .default))
                    .keyboardType(.decimalPad)
                Spacer()
                Text("\( (input == "" || input == "1") ? "Share" : "Shares")")
                    .font(Font.system(size: 25, design: .default))
            }
            HStack{
                Spacer()
                
                Text("x $\(String(format: "%.2f",stock.change))/share = $\(input == "" ? "0.0" : String(format:"%.2f", Double(input)! * stock.change ) )")
                    .font(.body)
                
                
            }
            Spacer()
            HStack{
                Spacer()
                Text("$\(String(format: "%.2f", localStorage.wallet)) available to buy \(stock.ticker)")
                    .foregroundColor(.secondary)
                    .font(.footnote)
                Spacer()
            }
            HStack{
                Button("Buy"){
                    buyAction()
                }
                .frame(width: 200, height: 60)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
                .buttonStyle(PlainButtonStyle())
                Spacer()
                
                Button("Sell"){
                    sellAction()
                }
                .frame(width: 200, height: 60)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
                .buttonStyle(PlainButtonStyle())
            }
            .sheet(isPresented: $modalState.isModal2Presented){
                CongratsView(didBuy: $didBuy, shares: $input, stock: $stock, modalState: self.modalState)
            }
        }
        .toast(isPresented: self.$showToast) {
            HStack {
                Text("\(toastString)")
            }
        }
        .padding()
    }
    
    func buyAction(){
        if input == "" || input == "0" {
            toastString = "Cannot buy non-positive shares"
            showToast = true
        }
        else if Double(input)! * stock.change > localStorage.wallet {
            toastString = "Not enough money to buy"
            showToast = true
        }
        else {
            let buyingPrice = Double(input) ?? 0.0 * stock.change
            localStorage.wallet -= buyingPrice
            localStorage.net += buyingPrice
            stock.shares += Int(input) ?? 0
//            if localStorage.portfolioArray.contains(where: {$0.ticker == stock.ticker}){
//
//            } else {
//                localStorage.portfolioArray.append(stock)
//            }
            localStorage.portfolioArray = localStorage.portfolioArray.filter{item in
                item.ticker != stock.ticker
            }
            localStorage.portfolioArray.append(stock)
            didBuy = true
            self.modalState.isModal2Presented = true
        }
        
    }
    func sellAction(){
        if input == "" || input == "0" {
            toastString = "Cannot sell non-positive shares"
            showToast = true
        }
        else if Int(input)! > stock.shares {
            toastString = "Not enough shares to sell"
            showToast = true
        }
        else{
            let sellingPrice = Double(input) ?? 0.0 * stock.change
            localStorage.wallet += sellingPrice
            localStorage.net -= sellingPrice
            stock.shares -= Int(input) ?? 0
            if stock.shares == 0 {
                localStorage.portfolioArray = localStorage.portfolioArray.filter{item in
                    item.ticker != stock.ticker
                }
            }
            localStorage.portfolioArray = localStorage.portfolioArray.filter{item in
                item.ticker != stock.ticker
            }
            localStorage.portfolioArray.append(stock)
            didBuy = false
            self.modalState.isModal2Presented = true
        }
    }
}
