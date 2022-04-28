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
                Text("\(input == "" ? "Share" : "Shares")")
                    .font(Font.system(size: 25, design: .default))
            }
            HStack{
                Spacer()
                Text("x $\(String(format: "%.2f",stock.change))/share = $\(input == "" ? "0.0" : String(Double(input)! * stock.change))")
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
                    
                }
                .frame(width: 200, height: 60)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
                .buttonStyle(PlainButtonStyle())
                
                Spacer()
                
                Button("Sell"){
                    
                }
                .frame(width: 200, height: 60)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding()
    }
}
