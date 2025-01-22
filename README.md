## TL;DR
We’re launching Opengrep, a fork of Semgrep OSS, in response to recent changes by Semgrep that affects its open-source nature and shift focus to its paid offering, limiting access and innovation for the broader community.

Our commitment to Opengrep ensures that its static code analysis engine and rules remain accessible to everyone. We’re investing for the long term with a strong roadmap for impactful new features. Together, we will democratize Static Application Security Testing (SAST) and code security to empower developers to build more secure software.

We invite everyone who shares this mission to use and contribute to Opengrep. 

## Background
Since 2017, Semgrep has been an exemplary leader in the open-source security community. It maintains two open-source projects:
- OSS Engine: A smart taint-aware pattern matcher, a fast way to analyze large codebases. Licensed under [LGPL 2.1](https://www.tldrlegal.com/license/gnu-lesser-general-public-license-v2-1-lgpl-2-1).
- OSS Rules: A shared registry combining Semgrep’s rules with community contributions built on the engine. Now licensed under Semgrep’s own [Rules License](https://semgrep.dev/legal/rules-license/).

These projects have helped democratize Static Application Security Testing (SAST), a historically inaccessible, highly specialized field. Best put by Semgrep co-founder Luke O’Malley, *“That’s the big breakthrough. Semgrep is an open-source project that’s by developers, for developers.”* ([Interview, 2022](https://news.mit.edu/2022/r2c-software-security-0210))

Since then, Semgrep has focused on its commercial SaaS management platform, as its open-source community has continued to flourish. Over eight years, the Semgrep community has grown to millions of users and contributors. This ecosystem also comprises customers, vendors, and others who actively support and advance the open source projects, all united by a common goal: helping developers build more secure software.

On December 13th, 2024, Semgrep announced license changes to its OSS rules repository and moved critical features of its OSS engine behind the commercial license. 
1. All new community-contributed rules will be locked behind Semgrep’s license permitting only their product to utilize them;
2. Key features of the scanning engine were moved behind the commercial SaaS platform, including tracking ignores, lines of code, fingerprint, and meta-variables.

This comes as no surprise to the community; Semgrep has been quietly reducing its support for the OSS engine for a long time. Beyond the license and feature migration, Semgrep rebranded from “Semgrep OSS” to “Semgrep Community Edition.” This confirms a departure from their open source commitment and goal to democratize code security for developers. 

## Our concern
Semgrep’s decision creates turmoil for end users and vendors alike who are committed to open, simple, and shareable SAST engines.

[Open-source license changes by private vendors](https://github.com/caniszczyk/rugpulls.dev) are no small matter, often leading to disruption and uncertainty for contributors and users of those projects. In such cases, the future of the community hangs in doubt as community members must work to continue and protect an open future. When ElasticSearch switched its licensing strategy, halting new open-source versions of Elasticsearch and Kibana, AWS stepped up to launch [OpenSearch](https://aws.amazon.com/blogs/opensource/stepping-up-for-a-truly-open-source-elasticsearch/). When Hashicorp pulled the plug on Terraform open-source, the community came together with [Opentofu](https://opentofu.org/manifesto/) to ensure a home for Terraform that the community can unite behind, build on and depend on. The Opentofu community outlines it well: 

*“This sort of change also harms all similar open-source projects. Every company and every developer now needs to think twice before adopting and investing in an open-source project in case the creator suddenly decides to change the license.”*

As much as the changes have been positioned as only affecting other SaaS providers, their walling of experimental and “Pro” features stunted the capabilities of its open-source scanner. This creates serious disruptions for end-users and organizations alike, as the communities scramble to adopt new standards. 

## Our mission
We believe that discovering security issues must remain accessible to all. Opengrep will empower every developer with open and transparent SAST, making secure software development a shared standard. 

This is why a consortium of 10+ organizations in the application security space, including [Aikido Security](https://www.aikido.dev/), [Arnica](https://www.arnica.io), [Amplify](https://amplify.security/), [Endor Labs](https://www.endorlabs.com/), [Jit](https://www.jit.io/), [Kodem](https://www.kodemsecurity.com/), [Legit](https://www.legitsecurity.com/), [Mobb](https://www.mobb.ai/), [Orca Security](https://orca.security/), and others have united behind Opengrep. 

By working together, we can pool resources, development power, and expertise to advance static code analysis further and faster. Collectively, we can create detections that can be responsive, easily shared, and widely distributed. 

## Your value
For users, Opengrep means:
1. A **better and more capable** scanning engine by not hiding essential metadata and new scanning capabilities behind a login. Opengrep will be **backward compatible** and support common JSON and SARIF outputs, enabling you to adopt and integrate Opengrep OSS into your workflows;
2. An **improved engine** means more capable community rules by unlocking previously pro-only capabilities;
3. **Long-term assurance** that your rules won't be locked into specific vendors, so you can take them easily between your jobs no matter which code security provider they use.
4. Your contributions to Opengrep and PRs are regularly reviewed and accepted on merit, not contingent upon the commercial interest of any single company.


Each organization contributes resources and OCAML development power to improve Opengrep’s SAST engine for the benefit and free use of all. To further guarantee Opengrep’s open future, parties have committed a timeframe to move Opengrep under foundation management.

Democratizing static code analysis isn’t just a technical goal—it’s a mission to make security scalable, accessible, and impactful for all.

## Social channels
We encourage community driven conversations via [X](https://x.com/opengrep), [Reddit](https://www.reddit.com/r/opengrep) or [GitHub](https://github.com/opengrep/opengrep). 
