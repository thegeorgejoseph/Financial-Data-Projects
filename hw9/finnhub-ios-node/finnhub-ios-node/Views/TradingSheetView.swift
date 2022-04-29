//
//  TradingSheetView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import SwiftUI

struct TradingSheetView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var stock: Stock
    @State private var input: String = ""
    @State var showingSheet: Bool = false
    @State var didBuy: Bool = false
    @Binding var portfolioSheetBinding: Bool
    @State private var showToast: Bool = false
    @State var toastString: String = ""
    @State var wallet: Double = 25000.00
    var body: some View {
        VStack(alignment: .leading, spacing: 10){
            HStack{
                Spacer()
                Image(systemName: "xmark")
                    .onTapGesture{
                        dismiss()
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
                
                Text("x $\(String(format: "%.2f",stock.change))/share = $\(input == "" ? "0.0" : String(Double(input)! * stock.change ) )")
                    .font(.body)
                
                
            }
            Spacer()
            HStack{
                Spacer()
                Text("$\(25000) available to buy \(stock.ticker)")
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
            .sheet(isPresented: $showingSheet){
                CongratsView(didBuy: $didBuy, shares: $input, stock: $stock, showingSheet: $portfolioSheetBinding)
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
        else if Double(input)! * stock.change > wallet {
            toastString = "Not enough money to buy"
            showToast = true
        }
        else {
            didBuy = true
            showingSheet = true
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
            didBuy = false
            showingSheet = true
        }
    }
}
