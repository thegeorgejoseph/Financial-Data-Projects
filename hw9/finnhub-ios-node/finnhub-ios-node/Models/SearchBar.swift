//
//  SearchBar.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import Foundation
import SwiftUI

class SearchBar: NSObject, ObservableObject {

    @Published var text: String = ""
    @Published var results: [String]? = nil
    let debouncer = Debouncer(delay: 0)
    private var autoObj: AutocompleteHandler =  AutocompleteHandler()
    let searchController: UISearchController = UISearchController(searchResultsController: nil)

    override init() {
        super.init()
        self.searchController.obscuresBackgroundDuringPresentation = false
        self.searchController.searchResultsUpdater = self
    }
}

extension SearchBar: UISearchResultsUpdating {

    func updateSearchResults(for searchController: UISearchController) {
        
        // Publish search bar text changes.
        if let searchBarText = searchController.searchBar.text {
            self.text = searchBarText
            debouncer.run(action: {
                self.autoObj.getData(section: searchBarText)
                self.results = self.autoObj.result
            })
        }
    }
}

struct SearchBarModifier: ViewModifier {

    let searchBar: SearchBar

    func body(content: Content) -> some View {
        content
            .overlay(
                ViewControllerResolver { viewController in
                    viewController.navigationItem.searchController = self.searchBar.searchController
                }
                    .frame(width: 0, height: 0)
            )
    }
}

extension View {

    func add(_ searchBar: SearchBar) -> some View {
        return self.modifier(SearchBarModifier(searchBar: searchBar))
    }
}

final class ViewControllerResolver: UIViewControllerRepresentable {
    
    let onResolve: (UIViewController) -> Void
        
    init(onResolve: @escaping (UIViewController) -> Void) {
        self.onResolve = onResolve
    }
    
    func makeUIViewController(context: Context) -> ParentResolverViewController {
        ParentResolverViewController(onResolve: onResolve)
    }
    
    func updateUIViewController(_ uiViewController: ParentResolverViewController, context: Context) { }
}

class ParentResolverViewController: UIViewController {
    
    let onResolve: (UIViewController) -> Void
        
    init(onResolve: @escaping (UIViewController) -> Void) {
        self.onResolve = onResolve
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("Use init(onResolve:) to instantiate ParentResolverViewController.")
    }
    
    override func didMove(toParent parent: UIViewController?) {
        super.didMove(toParent: parent)
        if let parent = parent {
            //parent.navigationController?.navigationBar.prefersLargeTitles = true
            //parent.navigationItem.largeTitleDisplayMode = .never
            self.onResolve(parent)
            // print("didMove(toParent: \(parent)")
        }
    }
}
