# Drawarc architecture reference library

100 original real-world problem patterns, composed into 10,000 configurable reference variants (10 deployment contexts x 10 design concerns). These are generated design references, not 10,000 independently audited production deployments.

## Use and customize

Browse https://drawarc.in/examples . Download a .mmd file or editable project. Sign in and choose Customize to create a private file. You can also import supported public GitHub diagram files at https://drawarc.in/examples/import . Third-party source is not included in this original library and retains its upstream license.

Run Node.js 20+ with no external dependencies:

    node generate.cjs

This creates 10,000 Mermaid files and a manifest under examples/. The website source and this generator use the same catalog engine. Change patterns.json to customize a problem flow; edit catalog.cjs to change deployment contexts or concern composition, then regenerate. Each output is editable text.

## Review before use

Replace generic services, document trust boundaries, validate connections and test your own capacity, security, retention and recovery decisions. A diagram is not an infrastructure deployment, compliance assessment or operational guarantee. Clinical and financial workflow examples describe software data flow only.

## License

Original source is MIT licensed. Keep LICENSE when redistributing. Do not assume public GitHub source has a permissive license: check the upstream project.

## Contributions

Propose a concrete problem statement, component flow, assumptions, failure paths and source provenance. Do not contribute private diagrams, credentials or third-party content without permission. Generated variants must remain labelled as generated references.
