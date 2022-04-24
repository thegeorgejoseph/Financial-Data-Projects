//
//  Toast.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/22/22.
//

import SwiftUI

//Almost all of this is taken from the link provided in the documentation
struct Toast<Presenting,Content>: View where Presenting: View, Content: View {
    @Binding var isPresented: Bool
    let presenter: () -> Presenting
    let content: () -> Content
    let delay: TimeInterval = 2
    var body: some View {
        if self.isPresented {
            DispatchQueue.main.asyncAfter(deadline: .now() + self.delay) {
                withAnimation {
                    self.isPresented = false
                }
            }
        }
        return GeometryReader { geometry in
            ZStack(alignment: .bottom) {
                self.presenter()
                
                VStack{
                    Spacer()
                    ZStack {
                        Capsule()
                            .fill(Color.gray)
                        self.content()
                            .foregroundColor(Color.white)
                    }
                    .frame(width: geometry.size.width / 1.25, height: geometry.size.height / 10)
                    .opacity(self.isPresented ? 1 : 0)
                }
            }
            .padding(.bottom)
        }
        
    }
}
