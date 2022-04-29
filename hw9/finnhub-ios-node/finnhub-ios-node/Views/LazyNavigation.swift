//
//  LazyNavigation.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import Foundation
import SwiftUI

struct NavigationLazyView<Content: View>: View {
    let build: () -> Content
    init(_ build: @autoclosure @escaping () -> Content) {
        self.build = build
    }
    var body: Content {
        build()
    }
}
