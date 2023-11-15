const progressBar = document.querySelector('.js-loader-progress-bar');
const progressNumber = document.querySelector('.js-loader-progress-number');

const imgLoad = imagesLoaded('body'); // body内の画像を監視
const imgTotal = imgLoad.images.length; // 画像の総数を取得

let imgLoaded = 0; // ロードした画像カウント
let progressSpeed = 8; // プログレスバーの進むスピード 大きいほど速くなる
let progressCount = 0; // ローディングの進捗状況 0〜100
let progressResult = 0; // ローディングの進捗状況 0〜100

function disableScroll(event) {
  event.preventDefault();
}

document.addEventListener('touchmove', disableScroll, { passive: false });
document.addEventListener('mousewheel', disableScroll, { passive: false });

// 画像を一つロードするたびにimgLoadedのカウントをアップ
imgLoad.on('progress', function (instance, image) {
  imgLoaded++;
  updateProgress(); // 画像が読み込まれるたびに進捗を更新
});

// 読み込み状況アップデート関数
function updateProgress() {
  // ローディング演出用の計算
  progressCount += (imgLoaded / imgTotal) * progressSpeed;

  if (progressCount >= 100 && imgTotal > imgLoaded) {
    // カウントは100以上だが画像の読み込みが終わってない
    progressResult = 99;
  } else if (progressCount > 99.9) {
    // カウントが100以上になった
    progressResult = 100;
  } else {
    // 現在のカウント
    progressResult = progressCount;
  }

  // ローディング進捗状況をプログレスバーと数字で表示
  progressBar.style.width = `${progressResult}%`;
  progressNumber.innerText = Math.floor(progressResult);

  // ローディング完了後 0.8秒待ってページを表示
  if (progressResult >= 100 && imgTotal == imgLoaded) {
    clearInterval(progressInit);

    // ローディング完了後の処理をここに追加
    setTimeout(function () {
      document.querySelector(".line01").classList.add('animate');
      document.querySelector(".line02").classList.add('animate');;
      document.querySelector(".logo").classList.add('animate');;
      document.querySelector('body').classList.add('is-loaded');
      document.removeEventListener('touchmove', disableScroll, { passive: false });
      document.removeEventListener('mousewheel', disableScroll, { passive: false });
    }, 1800); // 0.8秒待つ
  }
}

// 読み込み状況をアップデート
let progressInit = setInterval(function () {
  updateProgress();
}, 25);
