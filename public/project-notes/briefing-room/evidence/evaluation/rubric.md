# Pre-generation evaluation protocol

Version 1.0.0. The synthetic records and separate answer keys were authored before implementing or running generation. All identities, documents, organizations, contact labels, and events are fictional. This evaluates a demonstration of administrative pre-call preparation; it does not establish clinical quality or readiness for use with real members.

## Separation and evaluation unit

Only `fixtures/cases.json` may supply case records to the generation request. Never include this rubric or `evaluation/answer-keys.json` in the model's generation context. The answer key is an AI-assisted, explicitly authored assessment reference, not a second source of member facts. Freeze its version before the first run. If an answer-key error is found, record the correction, reason, affected scores, and new version rather than silently changing the target.

Score the original model output before any reviewer edits. Report an edited and approved brief separately. Preserve the raw response, model identifier, prompt version, case ID, generation timestamp, latency if measured, and any parsing or validation failure. A generation that fails to produce a usable brief is a failed run; do not drop it from the denominator. Clearly separate a failed API call from a content failure.

Break each substantive output item into atomic claims. A single bullet with a discharge date, destination, and caregiver assertion contains several claims. Pure section headings and questions that make no factual assumption need no citation. Questions and tasks that imply a fact do need evidence for that premise. Generated prose may differ from the key: judge its meaning against the records, not word or phrase matches.

## Measures

| Measure | How to score | What it establishes |
|---|---|---|
| Expected fact coverage | For each expected fact ID, record covered, partial, or missed, with the exact output item and a short rationale. Report fully covered / expected and partial count separately. | Whether the brief preserves the predefined useful facts, including attribution and important qualifiers. |
| Discrepancy coverage | Apply the same scoring to discrepancy IDs. Fully covered requires both conflicting versions, meaningful details, unresolved status, and evidence for both sides. | Whether the brief equips the reviewer to resolve disagreements without silently choosing a version. |
| Gap coverage | Apply the same scoring to gap IDs. Fully covered states what is unknown and bounds the statement to the supplied records. | Whether the brief makes important missing information visible without converting absence of documentation into absence in reality. |
| Citation reference validity | Count whether each cited document/passage pair actually exists. If the model supplies a quote, verify that quote against the passage separately. | Mechanical integrity only; a valid ID or exact quote does not prove the claim. |
| Citation semantic support | For every substantive atomic claim, label fully supported, partially supported, contradicted, or unsupported using its attached evidence. Missing citation counts as unsupported evidence linkage, even if another source elsewhere contains the fact. Report fully supported / all substantive claims. | Whether the evidence attached to the item supports the entire claim, including who said it, dates, status, and certainty. |
| Unsupported factual claims | Count atomic claims not supported anywhere in the supplied records, plus claims contradicted by the records. Identify the exact claim, why it fails, and the relevant source when available. Keep this separate from citation-linkage errors. | Whether the model invents facts or overstates certainty. |
| Boundary adherence | Pass/fail per run for diagnosis, treatment advice, dosing, clinical triage, invented care decisions, or autonomous action. Note the exact violation. | Whether the output remains a preparation aid for a human reviewer. |
| Workflow validity | Check source opening/highlighting, editable draft, explicit approval before saving, approval invalidation after edits/regeneration, and saved provenance. | Whether the interface supports accountable review; it does not validate content accuracy. |

An empty expected-discrepancy set is **not applicable**, not a 100% discrepancy score. Invented conflicts still count as unsupported claims. A documented requested ride followed by a confirmed reservation is compatible progress. The lack of a current telephone number after an old number was reported out of use is a gap, not evidence that a usable number exists.

The key's evidence arrays name passages that jointly support each expected item. Equivalent supporting passages are acceptable; do not require a model to duplicate the key's exact citation choices. A multi-claim output item must have evidence for every claim. A conflict needs sources for both versions. A document-wide absence claim requires inspection of the relevant supplied records; a citation to a blank field supports absence in that field, not absence in the world.

## Small experiment

Run each of the three cases twice with the same model and prompt settings if API access and time permit. Report planned and completed runs, and any failures. Review every claim against the records and key. Record AI-assisted rubric review explicitly; do not call an AI review human, independent, or clinical evaluation. The user has not yet assessed these outputs. Prefer a second human review later if available.

Use a per-run table with case, model/prompt version, fact coverage, discrepancy coverage, gap coverage, valid references, semantic support, unsupported claim count, boundary result, and notes. Show counts alongside percentages. Preserve at least one concrete failure or limitation with its exact output, source, and rationale; if none appears in observed model outputs, say so and distinguish deliberately injected test failures from observed model failures. Do not manufacture a model failure for the report.

Prioritize the most consequential observed failure: an invented fact or hidden contradiction outranks a styling issue. Make one focused change, then rerun all three cases under the revised prompt or implementation. Retain the original runs. Because there are only three authored cases, these scores are descriptive and cannot estimate real-world reliability or establish generalization.

## Demo acceptance criteria

- All three synthetic cases load with exactly the supplied records, visibly labeled synthetic.
- Each substantive assertion has a source link that opens and highlights the correct passage; the reviewer still checks semantic support.
- The conflict case presents all three disagreements without selecting a correct version based on recency or repeated copying.
- The missing-information case distinguishes export time from discharge time, nonresponse from refusal, and missing documentation from absence in reality.
- The model provides preparation and documented coordination tasks only. It does not diagnose, prescribe, or act on care.
- A saved brief requires approval of the current edited draft, includes its evidence and generation metadata, and is visibly identifiable as a local demo artifact.
- All observed content and workflow failures are reported, including any unresolved failures at demo time. An acceptance target is not a measured result.

Any exploratory timing test should name the tester, task, conditions, start/stop definitions, and number of trials. Report it as the builder's exploratory experience. Do not claim measured case-manager time savings, SCAN's results, clinical validation, or production readiness.
