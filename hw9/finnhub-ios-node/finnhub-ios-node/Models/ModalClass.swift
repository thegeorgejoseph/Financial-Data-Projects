//
//  ModalClass.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/30/22.
//

import Foundation

class ModalState: ObservableObject {
    @Published var isModal1Presented: Bool = false
    @Published var isModal2Presented: Bool = false
}
