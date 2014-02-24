#!/usr/bin/env python
from listener import Listener
from config import Config


def main():
    Config.load()
    Listener().run()

if __name__ == '__main__':
    main()
