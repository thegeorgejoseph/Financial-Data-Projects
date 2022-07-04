//
//  InsightsView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI

struct InsightsView: View {
    @Environment(\.defaultMinListRowHeight) var minRowHeight
    @State var profile: Profile
    @State var insights: Insights
    var body: some View {
        Text("Social Sentiments")
            .font(.title.weight(.semibold))
        
        HStack{
            List{
                Text("\(profile.name)")
                Text("Total Mentions")
                Text("Positive Mentions")
                Text("Negative Mentions")
            }
                .font(.caption.weight(.bold))
                .frame(minHeight: minRowHeight * 5)
                .listStyle(PlainListStyle())
            List{
                Text("Reddit")
                    .font(.caption.weight(.bold))
                Text("\(insights.reddit.mention)")
                    .font(.caption)
                Text("\(insights.reddit.positiveMention)")
                    .font(.caption)
                Text("\(insights.twitter.positiveMention)")
                    .font(.caption)
            }
            .frame(minHeight: minRowHeight * 5)
            .listStyle(PlainListStyle())
            List{
                Text("Twitter")
                    .font(.caption.weight(.bold))
                Text("\(insights.twitter.mention)")
                    .font(.caption)
                Text("\(insights.reddit.negativeMention)")
                    .font(.caption)
                Text("\(insights.twitter.negativeMention)")
                    .font(.caption)
            }
            .frame(minHeight: minRowHeight * 5)
            .listStyle(PlainListStyle())
        }
        
//        HStack{
//            VStack{
//                Text("\(profile.name)")
//                Divider()
//                Text("Total Mentions")
//                Divider()
//                Text("Positive Mentions")
//                Divider()
//                Text("Negative Mentions")
//            }
//                .font(.caption.weight(.bold))
//            VStack{
//                Text("Reddit")
//                    .font(.caption.weight(.bold))
//                Divider()
//                Text("\(insights.reddit.positiveMention)")
//                Divider()
//                Text("\(insights.reddit.negativeMention)")
//            }
//            VStack{
//                Text("Twitter")
//                    .font(.caption.weight(.bold))
//                Divider()
//                Text("\(insights.twitter.positiveMention)")
//                Divider()
//                Text("\(insights.twitter.negativeMention)")
//            }
//        }
    }
}
