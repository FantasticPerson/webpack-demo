const path = require('path');
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')


var website = {
    publicPath:"http://10.10.61.115:8081/"
}

module.exports={
    entry:{
        entry:'./src/index.js',
        entry2:'./src/index2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //use:['style-loader','css-loader'],
                //  loader:['style-loader','css-loader'],
                // use:[{
                //     loader:"style-loader"
                // },{
                //     loader:"css-loader"
                // }]

                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
                //include:
                //exclude
                //query
            },
            {
                test:/\.less$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:['css-loader','less-loader']
                })
            },
            {
                test:/\.scss/,
                // use:[
                //     {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     },
                //     {
                //         loader:'sass-loader'
                //     }
                // ]
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:"images/"
                    }
                }]
            },{
                test:/\.(html|htm)$/i,
                use:[
                    'html-withimg-loader'
                ]
            }
        ]
    },
    plugins:[
        // new uglify()
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("css/index2.css")
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'10.10.61.115',
        compress:true,
        port:8081
    }
}