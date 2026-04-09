<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api, { STRAPI_URL } from '../services/api'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(true)
const relatedArticles = ref([])

onMounted(async () => {
  try {
    const data = await api.getArticle(route.params.documentId)
    article.value = data || null
    // Fetch related articles (latest 3 excluding current)
    const all = await api.getArticles({ sort: 'date:desc', 'pagination[limit]': 4, populate: '*' })
    relatedArticles.value = (all || []).filter(a => getField(a, 'documentId') !== route.params.documentId).slice(0, 3)
  } catch (e) {
    console.error('Failed to fetch article:', e)
  } finally {
    loading.value = false
  }
})

const getField = (a, field) => a?.[field] || a?.attributes?.[field] || ''
const getImageUrl = (a) => {
  const img = a?.image || a?.attributes?.image
  if (img?.data?.attributes?.url) {
    const url = img.data.attributes.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  if (img?.url) {
    const url = img.url
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  }
  return null
}
const formatDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
const getCategory = (a) => {
  const cat = a?.category || a?.attributes?.category
  if (typeof cat === 'object') return cat?.data?.attributes?.name || ''
  return cat || ''
}

const contentParagraphs = computed(() => {
  const content = getField(article.value, 'content')
  if (!content) return []
  return content.split('\n').filter(p => p.trim())
})
const shareUrl = computed(() => {
  if (typeof window !== 'undefined') return window.location.href
  return ''
})

const twitterShareUrl = computed(() => {
  const title = getField(article.value, 'title')
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl.value)}`
})

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
})

const whatsappShareUrl = computed(() => {
  const title = getField(article.value, 'title')
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl.value)}`
})
</script>

<template>
  <div class="berita-detail-view">
    <div v-if="loading" class="loading-state container">
      <i class="fas fa-spinner fa-spin"></i> Memuat artikel...
    </div>

    <div v-else-if="!article" class="empty-state container">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Artikel tidak ditemukan.</p>
      <router-link to="/berita" class="btn btn-primary">← Kembali ke Berita</router-link>
    </div>

    <template v-else>
      <!-- Breadcrumb -->
      <section class="container breadcrumb-bar" data-reveal="fade-up">
        <router-link to="/">Beranda</router-link>
        <i class="fas fa-chevron-right"></i>
        <router-link to="/berita">Berita</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>Detail</span>
      </section>

      <!-- Article Content -->
      <article class="container article-wrapper">
        <div class="article-main" data-reveal="fade-up">
          <div class="article-meta">
            <span class="cat-badge" v-if="getCategory(article)">{{ getCategory(article) }}</span>
            <span class="article-date"><i class="far fa-calendar-alt"></i> {{ formatDate(getField(article, 'date') || getField(article, 'createdAt')) }}</span>
            <span class="article-author" v-if="getField(article, 'author')"><i class="far fa-user"></i> {{ getField(article, 'author') }}</span>
          </div>

          <h1 class="article-title">{{ getField(article, 'title') }}</h1>

          <div class="article-hero" v-if="getImageUrl(article)">
            <img :src="getImageUrl(article)" :alt="getField(article, 'title')" />
          </div>

          <div class="article-content">
            <p v-for="(paragraph, i) in contentParagraphs" :key="i">{{ paragraph }}</p>
          </div>

          <div class="article-share">
            <span>Bagikan:</span>
            <a :href="twitterShareUrl" target="_blank" class="share-btn twitter"><i class="fab fa-x-twitter"></i></a>
            <a :href="facebookShareUrl" target="_blank" class="share-btn facebook"><i class="fab fa-facebook-f"></i></a>
            <a :href="whatsappShareUrl" target="_blank" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="article-sidebar">
          <div class="sidebar-card" data-reveal="fade-left" data-reveal-delay="200">
            <h3>Berita Terbaru</h3>
            <router-link
              v-for="item in relatedArticles"
              :key="item.id"
              :to="`/berita/${item.documentId}`"
              class="related-item"
            >
              <div class="related-img">
                <img v-if="getImageUrl(item)" :src="getImageUrl(item)" :alt="getField(item, 'title')" />
                <div v-else class="img-placeholder-sm"><i class="fas fa-image"></i></div>
              </div>
              <div class="related-text">
                <h4>{{ getField(item, 'title') }}</h4>
                <span class="news-time"><i class="far fa-clock"></i> {{ formatDate(getField(item, 'date') || getField(item, 'createdAt')) }}</span>
              </div>
            </router-link>
          </div>

          <router-link to="/berita" class="btn btn-primary btn-block" data-reveal="fade-left" data-reveal-delay="400">
            <i class="fas fa-arrow-left"></i> Semua Berita
          </router-link>
        </aside>
      </article>
    </template>
  </div>
</template>

<style scoped>
.breadcrumb-bar {
  padding: 20px 0;
  display: flex; align-items: center; gap: 10px;
  font-size: 0.85rem; color: var(--pks-text-muted);
}
.breadcrumb-bar a { color: var(--pks-orange); font-weight: 600; }
.breadcrumb-bar a:hover { text-decoration: underline; }
.breadcrumb-bar i { font-size: 0.65rem; opacity: 0.5; }
.breadcrumb-bar span { color: var(--pks-navy); font-weight: 600; }

.article-wrapper {
  display: grid; grid-template-columns: 1fr 360px; gap: 40px;
  padding-bottom: 60px;
}

.article-main { background: white; border-radius: var(--radius); padding: 36px; box-shadow: var(--shadow-sm); }

.article-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
.cat-badge { background: var(--pks-orange); color: white; padding: 4px 14px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
.article-date { font-size: 0.85rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 6px; }
.article-author { font-size: 0.85rem; color: var(--pks-navy); display: flex; align-items: center; gap: 6px; font-weight: 600; }

.article-title { font-size: 1.8rem; color: var(--pks-navy); line-height: 1.35; margin-bottom: 24px; font-weight: 800; }

.article-hero { border-radius: var(--radius); overflow: hidden; margin-bottom: 28px; max-height: 420px; }
.article-hero img { width: 100%; height: 100%; object-fit: cover; }

.article-content { font-size: 1rem; line-height: 1.85; color: var(--pks-text-dark); }
.article-content p { margin-bottom: 18px; text-align: justify; }

.article-share {
  display: flex; align-items: center; gap: 12px;
  margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;
}
.article-share span { font-size: 0.85rem; color: var(--pks-text-muted); font-weight: 600; }
.share-btn {
  width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 0.9rem; transition: var(--transition);
}
.share-btn:hover { transform: translateY(-3px); }
.share-btn.twitter { background: #1da1f2; }
.share-btn.facebook { background: #1877f2; }
.share-btn.whatsapp { background: #25d366; }

/* Sidebar */
.article-sidebar { display: flex; flex-direction: column; gap: 20px; }
.sidebar-card { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow-sm); }
.sidebar-card h3 { font-size: 1.1rem; color: var(--pks-navy); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--pks-orange); }
.related-item {
  display: flex; gap: 14px; padding: 12px 0;
  border-bottom: 1px solid #f1f3f5; transition: var(--transition);
}
.related-item:last-child { border-bottom: none; }
.related-item:hover { transform: translateX(4px); }
.related-img { width: 80px; min-width: 80px; height: 60px; border-radius: 8px; overflow: hidden; }
.related-img img { width: 100%; height: 100%; object-fit: cover; }
.related-text h4 { font-size: 0.82rem; color: var(--pks-navy); font-weight: 700; line-height: 1.35; margin-bottom: 4px; }
.related-text .news-time { font-size: 0.72rem; color: var(--pks-text-muted); display: flex; align-items: center; gap: 4px; }
.img-placeholder-sm { width: 100%; height: 100%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
.img-placeholder-sm i { font-size: 1rem; }

.btn-block { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; text-align: center; }

.loading-state, .empty-state { text-align: center; padding: 100px 20px; color: var(--pks-text-muted); }
.loading-state i { font-size: 1.5rem; color: var(--pks-orange); }
.empty-state i { font-size: 3rem; color: #fbbf24; margin-bottom: 16px; display: block; }

@media (max-width: 992px) {
  .article-wrapper { grid-template-columns: 1fr; }
}
@media (max-width: 576px) {
  .article-main { padding: 24px 18px; }
  .article-title { font-size: 1.4rem; }
}
</style>
