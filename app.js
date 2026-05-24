  let currentLang = 'en';
  let isLive = false;
  let liveStream = null;

  // Get saved server URL or use default
  function getServerUrl() {
    return localStorage.getItem('serverUrl') || 'https://polygraph-bleak-resigned.ngrok-free.dev';
  }

  function saveServerUrl() {
    const url = document.getElementById('serverUrlInput').value.trim();
    if (!url) { showToast('❌ Please enter a URL'); return; }
    // Remove trailing slash
    const cleanUrl = url.replace(/\/$/, '');
    localStorage.setItem('serverUrl', cleanUrl);
    showToast('✅ Server URL saved!');
  }

  async function testConnection() {
    const url = getServerUrl();
    const statusDiv = document.getElementById('connectionStatus');
    const statusTitle = document.getElementById('statusTitle');
    const statusText = document.getElementById('statusText');
    statusDiv.style.display = 'block';
    statusTitle.textContent = 'TESTING...';
    statusText.textContent = 'Connecting to ' + url;
    try {
      const res = await fetch(url + '/health', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data = await res.json();
      statusTitle.style.color = 'var(--accent)';
      statusTitle.textContent = '✅ CONNECTED';
      statusText.textContent = 'Model: ' + data.model + '\nStatus: ' + data.status;
      showToast('✅ Connection successful!');
    } catch (e) {
      statusTitle.style.color = 'var(--accent3)';
      statusTitle.textContent = '❌ CONNECTION FAILED';
      statusText.textContent = 'Could not connect to server. Make sure Colab is running and the URL is correct.';
      showToast('❌ Connection failed');
    }
  }

  // Load saved URL on startup
  window.addEventListener('load', () => {
    const saved = localStorage.getItem('serverUrl');
    if (saved) document.getElementById('serverUrlInput').value = saved;
  });

  const translations = {
    en: {
      appName: 'Safe<span style="color:var(--accent)">Guard</span>',
      heroBadge: 'REAL-TIME PPE DETECTION',
      heroTitle: 'Detect Safety<br><span>Equipment</span>',
      heroDesc: 'AI-powered personal protective equipment detection using YOLOv8',
      statClasses: 'CLASSES',
      statAccuracy: 'ACCURACY',
      statImages: 'IMAGES',
      chooseLabel: 'CHOOSE DETECTION MODE',
      modeCamera: 'Camera',
      modeCameraDesc: 'Capture photo instantly',
      modeLive: 'Live Video',
      modeLiveDesc: 'Real-time detection',
      modeFile: 'Upload File',
      modeFileDesc: 'Select image or video from device',
      cameraLabel: 'CAMERA DETECTION',
      cameraPlaceholderText: 'Take a photo to detect<br>PPE equipment',
      analyzingText: 'Analyzing image...',
      detectedText: 'Detected Objects',
      captureText: 'Take Photo',
      liveText: 'Start Live Detection',
      stopLiveText: 'Stop Live Detection',
      backText: 'Back',
      backText2: 'Back',
      fileLabel: 'FILE DETECTION',
      fileDropText: 'Tap to select image or video<br>from your device',
      fileAnalyzingText: 'Analyzing file...',
      fileDetectedText: 'Detected Objects',
      selectFileText: 'Select File',
      aboutTitle: 'About <span style="color:var(--accent)">SafeGuard</span>',
      aboutModelTitle: 'MODEL INFO',
      aboutModelDesc: 'YOLOv8 trained on 8,814 images across 14 PPE classes. Developed as a final year project at Bilecik Şeyh Edebali University.',
      aboutAccuracyTitle: 'MODEL ACCURACY',
      aboutClassesTitle: 'DETECTED CLASSES',
      aboutDevTitle: 'DEVELOPER',
      aboutDevDesc: 'Zehra Menekşe — Computer Engineering, Bilecik Şeyh Edebali University<br><br>Advisor: Dr. Öğr. Üyesi Gizem ATAÇ KALE',
      navHome: 'HOME',
      navCamera: 'DETECT',
      navFile: 'FILES',
      navAbout: 'ABOUT',
    },
    tr: {
      appName: 'Güvenli<span style="color:var(--accent)">Göz</span>',
      heroBadge: 'GERÇEK ZAMANLI KKE TESPİTİ',
      heroTitle: 'Güvenlik<br><span>Ekipmanı Tespit</span>',
      heroDesc: 'YOLOv8 tabanlı kişisel koruyucu ekipman tespiti',
      statClasses: 'SINIF',
      statAccuracy: 'DOĞRULUK',
      statImages: 'GÖRÜNTÜ',
      chooseLabel: 'TESPİT MODU SEÇ',
      modeCamera: 'Kamera',
      modeCameraDesc: 'Anlık fotoğraf çek',
      modeLive: 'Canlı Video',
      modeLiveDesc: 'Gerçek zamanlı tespit',
      modeFile: 'Dosya Yükle',
      modeFileDesc: 'Cihazdan görüntü veya video seç',
      cameraLabel: 'KAMERA TESPİTİ',
      cameraPlaceholderText: 'KKE tespiti için<br>fotoğraf çekin',
      analyzingText: 'Görüntü analiz ediliyor...',
      detectedText: 'Tespit Edilen Nesneler',
      captureText: 'Fotoğraf Çek',
      liveText: 'Canlı Tespiti Başlat',
      stopLiveText: 'Canlı Tespiti Durdur',
      backText: 'Geri',
      backText2: 'Geri',
      fileLabel: 'DOSYA TESPİTİ',
      fileDropText: 'Görüntü veya video seçmek için<br>dokun',
      fileAnalyzingText: 'Dosya analiz ediliyor...',
      fileDetectedText: 'Tespit Edilen Nesneler',
      selectFileText: 'Dosya Seç',
      aboutTitle: 'Hakkında <span style="color:var(--accent)">GüvenliGöz</span>',
      aboutModelTitle: 'MODEL BİLGİSİ',
      aboutModelDesc: 'YOLOv8, 14 KKE sınıfında 8.814 görüntü ile eğitildi. Bilecik Şeyh Edebali Üniversitesi bitirme projesi olarak geliştirildi.',
      aboutAccuracyTitle: 'MODEL DOĞRULUĞU',
      aboutClassesTitle: 'TESPİT EDİLEN SINIFLAR',
      aboutDevTitle: 'GELİŞTİRİCİ',
      aboutDevDesc: 'Zehra Menekşe — Bilgisayar Mühendisliği, Bilecik Şeyh Edebali Üniversitesi<br><br>Danışman: Dr. Öğr. Üyesi Gizem ATAÇ KALE',
      navHome: 'ANA',
      navCamera: 'TESPİT',
      navFile: 'DOSYA',
      navAbout: 'HAKKINDA',
    }
  };

  function toggleLang() {
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    document.getElementById('langBtn').textContent = currentLang === 'en' ? 'TR' : 'EN';
    applyTranslations();
  }

  function applyTranslations() {
    const t = translations[currentLang];
    Object.keys(t).forEach(key => {
      const el = document.getElementById(key);
      if (el) el.innerHTML = t[key];
    });
  }

  function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') !== 'light';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀️';
  }

  function showPage(page) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    document.getElementById('nav-' + page).classList.add('active');
    if (page !== 'camera' && isLive) stopLive();
  }

  function goHome() { showPage('home'); }
  function startCamera() { showPage('camera'); }
  function startLive() { showPage('camera'); toggleLive(); }

  function capturePhoto() {
    document.getElementById('cameraInput').click();
  }

  function handleCameraCapture(event) {
    const file = event.target.files[0];
    if (!file) return;
    processFile(file, 'camera');
  }

  function openFile() {
    document.getElementById('fileInput').click();
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    showPage('file');
    processFile(file, 'file');
  }

  function processFile(file, mode) {
    const loadingId = mode === 'camera' ? 'cameraLoading' : 'fileLoading';
    const resultsId = mode === 'camera' ? 'cameraResults' : 'fileResults';
    const areaId = mode === 'camera' ? 'cameraArea' : 'fileArea';
    const scanId = mode === 'camera' ? 'scanOverlay' : 'fileScanOverlay';

    document.getElementById(loadingId).classList.add('visible');
    document.getElementById(resultsId).classList.remove('visible');
    document.getElementById(areaId).classList.add('active');
    document.getElementById(scanId).classList.add('active');

    if (mode === 'file') {
      const img = document.getElementById('previewImage');
      img.src = URL.createObjectURL(file);
      img.style.display = 'block';
      document.getElementById('fileDropZone').style.display = 'none';
    }

    // Convert image to base64 and send to real API
    const reader = new FileReader();
    reader.onload = async function(e) {
      const base64 = e.target.result.split(',')[1];
      try {
        const response = await fetch(getServerUrl() + '/detect', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({ image: base64 })
        });
        const data = await response.json();
        document.getElementById(loadingId).classList.remove('visible');
        document.getElementById(scanId).classList.remove('active');
        if (data.success) {
          showRealResults(mode, data.detections);
        } else {
          showToast('❌ Error: ' + data.error);
        }
      } catch (err) {
        document.getElementById(loadingId).classList.remove('visible');
        document.getElementById(scanId).classList.remove('active');
        showToast('❌ Could not connect to server');
      }
    };
    reader.readAsDataURL(file);
  }

  function showRealResults(mode, detections) {
    const resultsId = mode === 'camera' ? 'cameraResults' : 'fileResults';
    const listId = mode === 'camera' ? 'resultsList' : 'fileResultsList';
    const countId = mode === 'camera' ? 'resultsCount' : 'fileResultsCount';

    const noVestClasses = ['NO-Gloves', 'NO-Goggles', 'NO-Hardhat', 'NO-Mask', 'NO-Safety Vest', 'Fall-Detected'];

    document.getElementById(countId).textContent = detections.length;
    document.getElementById(listId).innerHTML = detections.length === 0
      ? '<div style="color:var(--text2);font-family:var(--font-mono);font-size:12px;padding:8px 0;">No PPE detected</div>'
      : detections.map(d => `
      <div class="result-item">
        <div class="result-label">
          <div class="result-dot ${noVestClasses.includes(d.label) ? 'danger' : ''}"></div>
          ${d.label}
        </div>
        <div class="result-conf">${d.confidence}</div>
      </div>
    `).join('');

    document.getElementById(resultsId).classList.add('visible');
    showToast(currentLang === 'en' ? '✅ Detection complete!' : '✅ Tespit tamamlandı!');
  }

  function showMockResults(mode) {
    const mockDetections = [
      { label: 'Hardhat', confidence: 0.94, type: 'safe' },
      { label: 'Safety Vest', confidence: 0.87, type: 'safe' },
      { label: 'NO-Gloves', confidence: 0.76, type: 'warning' },
    ];
    showRealResults(mode, mockDetections);
  }

  async function toggleLive() {
    if (isLive) {
      stopLive();
    } else {
      try {
        liveStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const video = document.getElementById('liveVideo');
        video.srcObject = liveStream;
        video.style.display = 'block';
        document.getElementById('cameraArea').classList.add('active');
        document.getElementById('liveIndicator').classList.add('visible');
        document.getElementById('scanOverlay').classList.add('active');
        document.getElementById('liveBtn').innerHTML = `🛑 <span>${translations[currentLang].stopLiveText || 'Stop Live'}</span>`;
        document.getElementById('cameraPlaceholder').style.display = 'none';
        isLive = true;
        showToast(currentLang === 'en' ? '🎥 Live detection started!' : '🎥 Canlı tespit başladı!');
      } catch (e) {
        showToast(currentLang === 'en' ? '❌ Camera access denied' : '❌ Kamera erişimi reddedildi');
      }
    }
  }

  function stopLive() {
    if (liveStream) {
      liveStream.getTracks().forEach(t => t.stop());
      liveStream = null;
    }
    const video = document.getElementById('liveVideo');
    video.style.display = 'none';
    video.srcObject = null;
    document.getElementById('liveIndicator').classList.remove('visible');
    document.getElementById('scanOverlay').classList.remove('active');
    document.getElementById('cameraArea').classList.remove('active');
    document.getElementById('cameraPlaceholder').style.display = 'block';
    document.getElementById('liveBtn').innerHTML = `🎥 <span id="liveText">${translations[currentLang].liveText}</span>`;
    isLive = false;
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Init
  applyTranslations();
