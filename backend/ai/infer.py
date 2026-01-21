import cv2
import uuid
from pathlib import Path
from ultralytics import YOLO

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media" / "violations"
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# ✅ Use trained helmet model
MODEL_PATH = Path(__file__).parent / "models" / "helmet.pt"
model = YOLO(str(MODEL_PATH))


def analyze_image(image_path: Path):
    """
    Returns None if helmet is worn.
    Returns dict if NO helmet is detected.
    """
    img = cv2.imread(str(image_path))
    if img is None:
        return None

    results = model(img)

    helmet_found = False
    no_helmet_found = False

    for box in results[0].boxes:
        cls_id = int(box.cls[0])
        cls_name = model.names[cls_id].lower().strip()

        print("Detected:", cls_name)

        if cls_name in ["with helmet", "helmet", "with_helmet"]:
            helmet_found = True

        if cls_name in ["no helmet", "without helmet", "no_helmet"]:
            no_helmet_found = True

    # ✅ Helmet present → no violation
    if helmet_found and not no_helmet_found:
        return None

    # 🚨 No helmet detected → violation
    if no_helmet_found or (not helmet_found):
        filename = f"{uuid.uuid4().hex}.jpg"
        save_path = MEDIA_DIR / filename
        cv2.imwrite(str(save_path), img)

        return {
            "plate_number": "UNKNOWN",
            "evidence_url": f"/media/violations/{filename}",
        }

    return None
