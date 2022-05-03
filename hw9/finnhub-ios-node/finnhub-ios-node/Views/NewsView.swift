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
    private let times: [String] = ["3 hr, 45 min","6 hr, 12 min","6 hr, 18 min","7 hr, 10 min","8 hr, 15 min","8 hr, 25 min","8 hr, 48 min",
                                   "9 hr, 26 min","9 hr, 32 min","9 hr, 55 min","10 hr, 10 min","15 hr, 45 min","15 hr, 32 min","18 hr, 20 min","19 hr, 10 min",
                                   "19 hr, 12 min","19 hr, 45 min","20 hr, 10 min","20 hr, 17 min"]
    var count: Int = 0
    var body: some View {
        let largeNews: News = news[0]
        let localNews: [News] = Array(news.dropFirst())
        VStack(alignment:.leading, spacing:10){
            Text("News")
                .font(.title.weight(.bold))
                .padding(.all)
            KFImage.url(URL(string:largeNews.image))
                .resizable()
                .frame(maxWidth: .infinity)
                .frame(height: 200)
                .aspectRatio(contentMode: .fill)
                .clipped()
                .cornerRadius(20)
                .padding(.all)
            VStack(alignment: .leading, spacing: 5){
                Text("\(largeNews.source)")
                    .font(.system(size:10).weight(.bold))
                    .foregroundColor(.secondary)
                + Text(" 2 hr, 15 min")
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
                        + Text("  \(times[news])")
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
                        .aspectRatio(contentMode: .fill)
                        .clipped()
                        .cornerRadius(5)
                        .padding(.trailing)
                }
            }
            .sheet(item: $selectedNews) {
                NewsSheetView(item: localNews[$0])
            }
            .padding(.leading)
        }
    }
}

extension Int: Identifiable {
    public var id: Int { self }
}
