//
//  PortfolioToast.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/22/22.
//

import Foundation
import SwiftUI

extension View{
    func toast<Content>(isPresented: Binding<Bool>, content: @escaping () -> Content) -> some View where Content: View {
            Toast(
                isPresented: isPresented,
                presenter: { self },
                content: content
            )
        }
}
