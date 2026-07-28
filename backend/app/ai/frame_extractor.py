"""
Frame Extractor Module — OpenCV VideoCapture-based frame sampler.
"""
from typing import List
import numpy as np

class FrameExtractor:
    def __init__(self, sample_rate: int = 30):
        self.sample_rate = sample_rate

    def extract(self, video_path: str) -> List[np.ndarray]:
        """Extract frames from video at sample_rate interval."""
        try:
            import cv2
            cap = cv2.VideoCapture(video_path)
            frames = []
            count = 0
            if not cap.isOpened():
                return frames
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                if count % max(1, self.sample_rate) == 0:
                    frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
                count += 1
            cap.release()
            return frames
        except Exception as e:
            print(f"[FrameExtractor] {e}")
            return []
