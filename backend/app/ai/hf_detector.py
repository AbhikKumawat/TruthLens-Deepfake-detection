

import numpy as np
from typing import Tuple

from transformers import pipeline as hf_pipeline
from PIL import Image
import torch


_classifier = hf_pipeline(
    task="image-classification",
    model="umm-maybe/AI-image-detector",
    device=0 if torch.cuda.is_available() else -1,
)


def is_model_available() -> bool:
    """
    Indicates that the Hugging Face model is available.
    """
    return True


def classify_frame(frame_rgb: np.ndarray) -> Tuple[str, float]:
    """
    Classify a single RGB frame.

    Args:
        frame_rgb: NumPy array of shape (H, W, 3) in RGB format.

    Returns:
        (label, confidence)

        label:
            "human"       -> Real image
            "artificial"  -> AI-generated image

        confidence:
            Float between 0.0 and 1.0
    """

    # Convert NumPy array to PIL image
    image = Image.fromarray(frame_rgb)

   
    if max(image.size) > 512:
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)

   
    results = _classifier(image)



    best = results[0]

    label = best["label"].strip().lower()
    confidence = float(best["score"])

    # Normalize labels for the rest of the pipeline
    if "human" in label or "real" in label:
        label = "human"
    else:
        label = "artificial"

    return label, confidence
