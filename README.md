# readable_climate_reports

## Purpose

Make climate reports machine readable, so they can be rendered in various inclusive ways.

We aim create software tools to enable the parsing, understanding and rendering of climate reports by globally significant organizations like IPCC, UNEP, and UNFCCC.

We hope this enables people around the world to more easily digest these reports directly, instead of having to always rely on media or influencers explaining them.

## Scope

This is a new project, we start with the latest report as of April 8 2022, which is the Mitigation section of the Sixth Assessment report, which can be found at https://www.ipcc.ch/report/ar6/wg3/

We will cover both the executive summary, the technical summary, and eventually the full report.

## Approach

### 1. Parsing

First, we have to parse a lossless representation of the report.
The output is a data structure which contains each page, each line, and each figure.

- we can start testing this a few pages at a time
- the data format can be a local SQLite Database, or a large JSON structure.
- there will be some very basic data types.

### 2. Logical rendering

Once we have the this basic data structure, we can convert it to a logical representation having paragraphs, nested paragraphs, sections, subsections, figures, references, datasets, etc.

Again, this can be saved into a SQLite DB, but the types of objects would now match the way people may explain these when talking to one another.

At this stage we can also determine confusing acronyms, create glossary, link sections based on references, etc.

### 3. Visual rendering

Having parsed and understood the data, we can create export it to Markdown, HTML, Roam/Notion or other formats.

At the very least, we'd like to create a lightweight version that everyone can access. Over time, there can be more and more rendering environments.

We can also consider exposing APIs, to make it easy for others to integrate with this work.
