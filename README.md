# readable_climate_reports

(*PMR: editing in petermr branch and adding comments*)

## Purpose

Make climate reports machine readable, so they can be rendered in various inclusive ways.

*Yes - also searchable by text and data content)*

We aim create software tools to enable the parsing, understanding and rendering of climate reports by globally significant organizations like IPCC, UNEP, and UNFCCC.

*Yes - and maybe also preprints and other authorities

We hope this enables people around the world to more easily digest these reports directly, instead of having to always rely on media or influencers explaining them.
*YES this is a key point. We can add explanataions of terms via our dictionaries, based on Wikidata*

## Scope

This is a new project, we start with the latest report as of April 8 2022, which is the Mitigation section of the Sixth Assessment report, which can be found at https://www.ipcc.ch/report/ar6/wg3/

We will cover both the executive summary, the technical summary, and eventually the full report.

*PMR I think the full report covers all sections*

## Approach

### 1. Parsing

First, we have to parse a lossless representation of the report.
The output is a data structure which contains each page, each line, and each figure.

*PMR. pages and lines are artefacts of PDF. We can move beyond them rapidly I hope. 
Figures contain text-captions and bitmap/pixel images (very few vector graphics)*

- we can start testing this a few pages at a time

*Yes I am working on 10 pages*

- the data format can be a local SQLite Database, or a large JSON structure.
- 
*I think XML/SVG is better for text as it is designed for styling and hyperlinks. Will explain why.*

- there will be some very basic data types.

*Yes - characters+coordinates+style ,  images, and a few vector graphics*

### 2. Logical rendering

Once we have the this basic data structure, we can convert it to a logical representation having paragraphs, nested paragraphs, sections, subsections, figures, references, datasets, etc.

*Fully agreed. Am wrking on this - I have a lot of experience. There may be some tools I don't know which add functionality*

Again, this can be saved into a SQLite DB, but the types of objects would now match the way people may explain these when talking to one another.

*do we need a DB? I have used Elastic in the past but I "lost touch" with the text. XML is good for this*

At this stage we can also determine confusing acronyms, create glossary, link sections based on references, etc.

*our dictionary structures are designed to support this. We create many different dictionaries for different purposes.*

### 3. Visual rendering

Having parsed and understood the data, we can create export it to Markdown, HTML, Roam/Notion or other formats.

*Yes*

At the very least, we'd like to create a lightweight version that everyone can access. Over time, there can be more and more rendering environments.

*Yes. Some people use XSLT stylsheets fot his, others use CSS. Main thing is to have a base of XML/HTML*

We can also consider exposing APIs, to make it easy for others to integrate with this work.

*Key thing is to have all sections identified by uniqueIds*

### 4. Searching and annotation

Each section has various implied semantics and ontology. We can use supervised (with dictionaries) classifiers to determine the classes. 

We can also build indexes based on text. Good candidates include:
* countries and oher geolocations
* organizations
* climate terms and abbreviations

