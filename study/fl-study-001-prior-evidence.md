# Prior evidence (published) — context for FL-STUDY-001

_Companion reference. The pre-registered `PROTOCOL.md` is frozen and unchanged; this file
records published prior evidence that motivates the study. It is context, not a result._

## What Google reports (MedGemma Technical Report)

MedGemma is Gemma 3 specialized for medical text + image. The 27B **multimodal** variant adds a
SigLIP image encoder pre-trained on de-identified medical images — **including dermatology
(skin), chest X-ray, ophthalmology, and histopathology**. Its own benchmark table shows the
specialization beating the base Gemma 3 27B on every listed medical-imaging task:

| Benchmark | Domain | Gemma 3 27B | MedGemma 27B mm | Δ |
|---|---|--:|--:|--:|
| US-DermMCQA | **dermatology / skin** | 66.9 | 71.7 | **+4.8** |
| EyePACS | **diabetic** retinopathy (fundus) | 20.3 | 75.3 | +55.0 |
| MIMIC-CXR (top-5 F1) | chest X-ray | 71.7 | 90.0 | +18.3 |
| CheXpert (top-5 F1) | chest X-ray | 26.2 | 49.9 | +23.7 |
| PathMCQA | histopathology | 42.2 | 71.6 | +29.4 |
| SLAKE | radiology VQA | 42.5 | 70.0 | +27.5 |
| MedXpertQA | multimodal reasoning | 22.0 | 26.8 | +4.8 |

Source: Sellergren et al., *MedGemma Technical Report*, arXiv:2507.05201 (2025).

## Why this study is still necessary

1. **Foot-wound photos are out-of-distribution.** None of the benchmarks above are diabetic
   post-surgical foot photographs. The closest transfer is the **dermatology** pre-training
   (skin appearance) and the **diabetic-retinopathy** exposure (diabetic-tissue change) — both
   suggestive, neither the same task.
2. **Their metric ≠ our task.** Those are classification / MCQ / VQA accuracies. Ours is
   *structured, closed-vocabulary observation with a deterministic escalation gate* on n=1
   longitudinal real photos.
3. **The prior predicts a MedGemma edge; it does not prove one here.** That is the entire point
   of the Digital Foot Lab — measure it on *these* photos, on *this* box, in the open.

So the expectation going in: MedGemma *should* observe at least as well as base Gemma 3, and
plausibly better on skin/wound appearance. FL-STUDY-001 tests whether that holds on real
diabetic foot photos — and defers the clinical verdict to a blinded podiatrist review.
