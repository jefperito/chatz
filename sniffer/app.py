#!/usr/bin/env python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('test', help='hello world', type=int)

args = parser.parse_args()

print args.test