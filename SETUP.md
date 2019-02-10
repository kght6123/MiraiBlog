# Vue＋Goプロジェクトのセットアップ

## Goをインストール

https://github.com/moovweb/gvm

```sh
# バージョン管理(gvm)のインストール
$ bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
$ source /Users/kogahirotaka/.gvm/scripts/gvm # gvmを$PATHに追加

# gvmのバージョン確認
$ gvm version

# 利用できるgoの確認（最新バージョンを控える）
$ gvm listall

# バイナリインストール、go1.4が不要
$ gvm install go1.11.5 -B

# インストールされたgoを確認
$ gvm list

# go1.11.5を使う
$ gvm use go1.11.5 # $PATHにgoの環境変数が追加

# goバージョン確認
$ go version
go version go1.11.5 darwin/amd64

# 環境変数の確認
$ echo $GOPATH
/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global
# $GOPATH/src/github.com/kght6123/MiraiBlog にプロジェクトを作る見込みで進める

$ echo $PATH
/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global/bin:/Users/kogahirotaka/.gvm/gos/go1.11.5/bin:/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global/overlay/bin:/Users/kogahirotaka/.gvm/bin

# パッケージ管理(dep)のインストール
$ brew install dep
$ dep version 
dep:
 version     : v0.5.0
 build date  : 2018-08-16
 git hash    : 224a564
 go version  : go1.10.3
 go compiler : gc
 platform    : darwin/amd64
 features    : ImportDuringSolve=false

# delve(デバッガ)をインストール
$ xcode-select --install # winは不要
$ go get -u github.com/go-delve/delve/cmd/dlv

# Echo Scaffold(echoフレームワークのCLI生成ツール -> https://github.com/mattn/echo-scaffold とりあえず使わない)
#$ go get github.com/mattn/echo-scaffold

# プロジェクトの初期化
#$ export GOPATH=~/develop/go # 任意の場所に設定 -> 変えない
$ mkdir -p $GOPATH/src/github.com/kght6123/MiraiBlog/backend \
; cd $GOPATH/src/github.com/kght6123/MiraiBlog/backend \
; dep init
$ ls
Gopkg.lock	Gopkg.toml	vendor

# echoフレームワークのパッケージを追加
$ dep ensure -add github.com/labstack/echo@^3.1

# サンプルファイル(seerver.go)を作成 -> https://echo.labstack.com/cookbook/hello-world

# backend/Gopkg.tomlのパッケージをインストール
$ dep ensure

# パッケージのアップデート
#$ dep ensure -update github.com/foo/bar

# 全てのパッケージをアップデート
#$ dep ensure -update

# シェルの起動設定に追加 (zshの場合)
echo 'source ${HOME}/.gvm/scripts/gvm' >>.zshrc
echo 'gvm use go1.11.5' >>.zshrc
```

## VSCodeの拡張機能をインストール

goのコーディング中などに促される、追加モジュールのインストールは必ず実施すること

もし、キャンセルしてしまった場合は、もう一度、VSCodeを開き直し、同じ操作を行うことで再表示される

プロジェクト名.code-workspaceに下記のsettings内の設定を追加

```json
{
	"folders": [
		{
			"path": "."
		}
	],
	"settings": {
		"go.useLanguageServer": true,
		"go.languageServerExperimentalFeatures": {
			"format": true,
			"autoComplete": true,
			"rename": true,
			"goToDefinition": true,
			"hover": true,
			"signatureHelp": true,
			"goToTypeDefinition": true,
			"goToImplementation": true,
			"documentSymbols": true,
			"workspaceSymbols": true,
			"findReferences": true
		},
		"go.lintFlags": [],
	}
}
```

.vscode/launch.jsonに下記の設定を追加

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Launch Golang",
			"type": "go",
			"request": "launch",
			"mode": "auto",
			"program": "${workspaceFolder}/backend",
			"env": {},
			"args": []
		},
	]
}
```

https://code.visualstudio.com/docs/editor/variables-reference

https://github.com/Microsoft/vscode-go

https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code

https://github.com/Microsoft/vscode-go/wiki/GOPATH-in-the-VS-Code-Go-extension

## Vueのセットアップ

```sh
# vue-cliの2.xを削除
$ yarn global remove vue-cli

# vue-cliの3.0を導入
$ yarn global add @vue/cli

# 新しいプロジェクトを作成 Manuallyを選択 -> aキーで全て選択 -> 基本的にYes -> Stylus -> TSLint -> Lint on Save -> Mocha + Chai -> Nightwatch -> In package.json -> No -> Use Yarn
$ vue create miraiblog-frontend

# リネーム
$ mv miraiblog-frontend frontend
$ rm -R frontend/.git # デフォルトのgitを削除
```

## ルートにtsconfig.jsonがないとエラー

frontendとbackendフォルダをrootに統合する

下記のコマンドでdevサーバを起動

```sh
$ yarn run serve
```

## StandaloneのVue-devtoolを導入

https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md

```sh
# vue-remote-devtoolsを導入
$ yarn global add @vue/devtools
% vue-devtools # 起動
```

``public/index.html``に``<script src="http://localhost:8098"></script>``を追記

## Vuex(Store)のモジュールやHotUpdateなどの使い方

https://github.com/hrpc/vue-webpack/blob/0793d3ae56f37095afb4566e2e2325fa3c50fdf4/vuex/types/test/index.ts

これが参考になりそう
