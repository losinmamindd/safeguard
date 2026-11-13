# SafeGuard — Real-Time PPE Detection System

SafeGuard is a mobile-friendly web app that checks whether construction workers are wearing their personal protective equipment (PPE), such as hard hats, safety vests, gloves, goggles and masks. It uses a custom-trained **YOLOv8** object detection model.

This project was developed as my graduation design project (**BM328 Computer Engineering Design Project II**) at **Bilecik Şeyh Edebali University**, Department of Computer Engineering.

## Features

- **Live PPE detection:** take a photo with the phone camera and get instant detection results
- **Worker registration:** register workers and keep their records
- **Compliance dashboard:** see which workers are compliant and which equipment is missing
- **Works on mobile:** tested on iPhone through the browser

## How It Works

```
Phone (browser)  ──►  Frontend (HTML/CSS/JS)  ──►  Flask backend  ──►  YOLOv8 model
                                              ◄──  detection results ◄──
```

1. The user opens SafeGuard on a phone and takes a photo.
2. The frontend sends the image to a Flask backend, which is exposed to the internet with ngrok.
3. The backend runs the YOLOv8 model and returns the detected equipment.
4. The app shows the results and updates the compliance dashboard.

## Model Results

Three models were trained on a custom 14-class PPE dataset in Google Colab, using transfer learning:

| Model | Epochs | mAP50 |
|---|---|---|
| YOLOv8m | 100 | 78.7% |
| YOLOv8l | 150 | 79.1% |
| **YOLOv8m (balanced, 80/20 sampling)** | **50** | **82.8%** (best) |

Class-balanced sampling made the biggest difference: the smaller YOLOv8m model, trained for fewer epochs, outperformed the larger YOLOv8l model.

## Tech Stack

- **Model:** YOLOv8 (Ultralytics), Python, Google Colab
- **Backend:** Flask, ngrok
- **Frontend:** HTML, CSS, JavaScript (getUserMedia camera API)

## Project Structure

| File | Description |
|---|---|
| `index.html` | Main detection page (camera + results) |
| `workers.html` | Worker registration |
| `dashboard.html` | Compliance dashboard |
| `app.js` | Frontend logic and API calls to the backend |
| `style.css` | Styles |

## Running It

1. Start the Flask backend with the trained YOLOv8 weights (run from Google Colab) and expose it with ngrok.
2. Open `index.html` in a browser (on a phone for the camera).
3. Go to the **Settings** page and paste your ngrok URL. It is saved in the browser for next time.

## Author

**Zehra Menekşe** — Computer Engineering student, Bilecik Şeyh Edebali University
Advisor: Dr. Öğr. Üyesi Gizem Ataç Kale
