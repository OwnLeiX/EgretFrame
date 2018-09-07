//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let shape = new egret.Shape();
        shape.width = 850
        shape.height = 1136
        shape.graphics.beginFill(0xFFFFFF)
        shape.graphics.drawRect(0, 0, 850, 1136)
        shape.graphics.endFill()
        this.addChild(shape)

        let fl = new Lx.FrameLayout(new Lx.LayoutParams(Lx.ViewGroupLayoutParams.MATCH_PARENT, Lx.ViewGroupLayoutParams.MATCH_PARENT))

        let leftTopP = new Lx.FrameLayoutLayoutParams(Lx.ViewGroupLayoutParams.WRAP_CONTENT, Lx.ViewGroupLayoutParams.WRAP_CONTENT)
        leftTopP.layoutGravity = Lx.Gravity.LEFT | Lx.Gravity.TOP
        leftTopP.marginLeft = 20
        let leftTopT = new Lx.TextView(leftTopP)
        leftTopT.text = "LeftTop"
        leftTopT.size = 30
        leftTopT.bold = true
        leftTopT.textColor = 0x000000


        let centerP = new Lx.FrameLayoutLayoutParams(Lx.ViewGroupLayoutParams.WRAP_CONTENT, Lx.ViewGroupLayoutParams.WRAP_CONTENT)
        centerP.layoutGravity = Lx.Gravity.CENTER
        let centerT = new Lx.TextView(centerP)
        centerT.text = "center"
        centerT.size = 30
        centerT.bold = true
        centerT.textColor = 0x000000


        let rithtBottomP = new Lx.FrameLayoutLayoutParams(Lx.ViewGroupLayoutParams.WRAP_CONTENT, Lx.ViewGroupLayoutParams.WRAP_CONTENT)
        rithtBottomP.layoutGravity = Lx.Gravity.RIGHT | Lx.Gravity.BOTTOM
        let rithtBottomT = new Lx.TextView(rithtBottomP)
        rithtBottomT.text = "rithtBottom"
        rithtBottomT.size = 30
        rithtBottomT.bold = true
        rithtBottomT.textColor = 0x000000

        let macthPP = new Lx.FrameLayoutLayoutParams(Lx.ViewGroupLayoutParams.MATCH_PARENT, Lx.ViewGroupLayoutParams.MATCH_PARENT)
        let macthPT = new Lx.TextView(macthPP)
        macthPT.text = "match"
        macthPT.size = 30
        macthPT.bold = true
        macthPT.textColor = 0x000000
        macthPT.textAlign = egret.HorizontalAlign.CENTER
        macthPT.verticalAlign = egret.VerticalAlign.BOTTOM

        fl.addChild(leftTopT)
        fl.addChild(centerT)
        fl.addChild(rithtBottomT)
        fl.addChild(macthPT)

        this.addChild(fl)
    }
}
