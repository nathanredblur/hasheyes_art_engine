# FFMPEG video merge

## setup 

#### Preconfigurations
```
$ xcode-select --install
$ brew update
$ brew upgrade
$ brew cleanup
```

### Python 
https://github.com/pyenv/pyenv#installation
```
brew install pyenv
echo 'eval "$(pyenv init --path)"' >> ~/.zprofile
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
pyenv install 3.10.1
pyenv global 3.10.1
pyenv versions
brew install openssl readline sqlite3 xz zlib

```


### FFMPEG command line tool
```
$ brew install ffmpeg
```

### Resize
```
ffmpeg -i layer2.mov -s 320x240 -c:a copy layer2-copy.mov
```


