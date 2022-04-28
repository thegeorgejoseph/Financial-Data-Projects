//
//  SceneDelegate.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import Foundation


// SceneDelegate.swift
import FacebookCore

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else {
        return
    }

    ApplicationDelegate.shared.application(
        UIApplication.shared,
        open: url,
        sourceApplication: nil,
        annotation: [UIApplication.OpenURLOptionsKey.annotation]
    )
}


