//
//  CongratsView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import SwiftUI

struct CongratsView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var didBuy: Bool
    @Binding var shares: String
    @Binding var stock: Stock
    @ObservedObject var modalState: ModalState
    var body: some View {
        VStack{
            Spacer()
            Text("Congratulations!")
                .font(.largeTitle.weight(.bold))
                .foregroundColor(Color.white)
                .padding()
            Text("\(didBuy == true ? "You have successfully bought \(shares) \(shares == String(1) ? "share" : "shares") of \(stock.ticker)" : "You have successfully sold \(shares) \(shares == String(1) ? "share" : "shares") of \(stock.ticker)")")
                .foregroundColor(Color.white)
            Spacer()
            Button("Done"){
                self.modalState.isModal1Presented = false
                self.modalState.isModal2Presented = false
            }
            .frame(width: 380, height: 50)
            .background(RoundedRectangle(cornerRadius: 50).fill(Color.white))
            .foregroundColor(Color.green)
            .font(.title3)
            .buttonStyle(PlainButtonStyle())
        }
        .frame(maxWidth:.infinity)
        
        .background(Color.green.ignoresSafeArea(.all))
    }
        
}
