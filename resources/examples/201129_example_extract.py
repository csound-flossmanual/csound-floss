#!/usr/bin/env python
# coding: utf-8

# This script extracts all csd examples from the .md files in 
# https://github.com/csound-flossmanual/csound-floss/tree/master/book
# joachim heintz dec 2020


def getStartEndLines(allLines):
    """returns two arrays containing the start and and lines 
    of the csd examples in allLines"""
    num = 0
    csCode = 0 #start of ~~~csound marker
    csd = 0 #start of a csd example
    csdStartLines = []
    csdEndLines = []
    for line in allLines:
        if csCode == 1 and csd==0:
            if '<CsoundSynthesizer>' in line or '<Cabbage>' in line:
                csdStartLines.append(num)
                csd = 1
        if csd == 1 and '~~~' in line:
            csdEndLines.append(num)
            csCode = 0
            csd = 0
        if '~~~csound' in line:
            csCode = 1
        num += 1
    return csdStartLines, csdEndLines

def stripExampleTitle(line):
    left = line.find('EXAMPLE')
    right = line.rfind('.csd')
    return line[left+7:right+4].lstrip()

def getExampleFileNames(mdinfile,allLines,csdStartLines):
    """look in the five lines before a csd example for the title
    by searching for EXAMPLE and .csd
    if not found, throw warning and generate substitution"""
    names = []
    for st in csdStartLines:
        name = ''
        for line in allLines[st-5:st]:
            if 'EXAMPLE' in line and '.csd' in line:
                name = line.replace('\\','')
        if name == '':
            print('WARNING: Example name in %s seems to be missing.' % mdinfile)
            print('  Substituting name for example starting in line %d instead.' % st)
            name = 'EXAMPLE SUBSTITUTION_%s_line_%d.csd' % (mdinfile,st)
        names.append(stripExampleTitle(name))
    return names

def extractCsdsFromFile(mdinfile,csdoutdir):
    """extract all csd examples in markdown file mdinfile 
    and write using the example titles to csdoutdir"""
    f = open(mdinfile,'r')
    f.seek(0)
    allLines = f.readlines()
    csdStartLines, csdEndLines = getStartEndLines(allLines)
    csdFileNames = getExampleFileNames(mdinfile,allLines,csdStartLines)
    for start, end, name in zip(csdStartLines,csdEndLines,csdFileNames):
        outname = '%s/%s' % (csdoutdir,name)
        out = open(outname,'w')
        s = ''.join(allLines[start:end])
        out.write(s)
        out.close()
    f.close()

# set the markdown dir and the output dir e.g.
mddir = '/home/jh/src/csound-floss/book/'
outdir = '/media/jh/Daten/Joachim/Csound/FLOSS/Release07/csd_examples'

# extract the csd examples and write to files
from os import listdir, chdir
chdir(mddir)
for file in sorted(listdir(mddir)):
    if file.endswith('md'):
        extractCsdsFromFile(file,outdir)


# you should see a message about 12-b line 516.
# this example is intentionally incorrect and should be removed manually.




