//
//  NewsView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI
import Kingfisher

struct NewsView: View {
    @Environment(\.defaultMinListRowHeight) var minRowHeight
    @State private var showingSheet = false
    @State var news: [News]
    @State private var selectedNews: Int? = nil
    var body: some View {
        let largeNews: News = news[0]
        let localNews: [News] = Array(news.dropFirst())
        VStack(alignment:.leading, spacing:10){
            Text("News")
                .font(.title.weight(.bold))
                .padding(.all)
            KFImage.url(URL(string:largeNews.image))
                .resizable()
                .frame(width: 380, height: 200)
                .aspectRatio(contentMode: .fit)
                .cornerRadius(20)
                .padding(.all)
            VStack(alignment: .leading, spacing: 5){
                Text("\(largeNews.source)")
                    .font(.system(size:10).weight(.bold))
                    .foregroundColor(.secondary)
                + Text("  \(largeNews.datetime)")
                    .font(.system(size:10))
                    .foregroundColor(.secondary)
                Text("\(largeNews.headline)")
                    .font(.caption.weight(.bold))
            }
            .padding()
            .onTapGesture{
                showingSheet.toggle()
            }
            .sheet(isPresented: $showingSheet) {
                NewsSheetView(item: largeNews)
            }
            Divider()
                .padding(.leading)
                .padding(.trailing)
            ForEach(0 ..< localNews.count, id: \.self){ news in
                HStack{
                    VStack(alignment: .leading, spacing: 5){
                        Text("\(localNews[news].source)")
                            .font(.system(size:10).weight(.bold))
                            .foregroundColor(.secondary)
                        + Text("  \(localNews[news].datetime)")
                            .font(.system(size:10))
                            .foregroundColor(.secondary)
                        Text("\(localNews[news].headline)")
                            .font(.caption.weight(.bold))
                    }
                    .onTapGesture{
                        selectedNews = news
                    }
                    Spacer()
                    KFImage.url(URL(string:localNews[news].image))
                        .resizable()
                        .frame(width: 100, height: 60)
                        .aspectRatio(contentMode: .fit)
                        .cornerRadius(5)
                        .padding(.trailing)
                }
            }
            .sheet(item: $selectedNews) {
                NewsSheetView(item: localNews[$0])
            }
            .padding(.trailing)
            .padding(.leading)
        }
    }
}

extension Int: Identifiable {
    public var id: Int { self }
}
