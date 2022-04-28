//
//  NewsSheetView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI

struct NewsSheetView: View {
    @Environment(\.dismiss) var dismiss
    @Environment(\.openURL) var openURL
    @State var item: News
    var body: some View {
        VStack(alignment: .leading, spacing: 10){
            HStack{
                Spacer()
                Image(systemName: "xmark")
                    .onTapGesture{
                        dismiss()
                    }
                    .foregroundColor(Color.gray)
            }
            .padding()
            Text("\(item.source)")
                .font(.title.weight(.bold))
            Text("\(item.datetime)")
                .font(.subheadline.weight(.medium))
                .foregroundColor(.secondary)
            Divider()
            Text("\(item.headline)")
                .font(.body.weight(.bold))
            Text("\(item.summary)")
                .font(.caption)
            HStack{
                Text("For more details click ")
                    .font(.footnote.weight(.medium))
                    .foregroundColor(.secondary)
                Text("here").font(.footnote.weight(.medium)).foregroundColor(Color.blue)
                    .onTapGesture {
                    openURL(URL(string: item.url)!)
                }
            }
            HStack{
                Image("Twitter social icons - circle - blue")
                    .resizable()
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
                Image("f_logo_RGB-Blue_144")
                    .resizable()
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
            }
            Spacer()
        }
        .padding()
        
        
    }
}
