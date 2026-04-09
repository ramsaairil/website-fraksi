<script setup>
import Hero from '../components/Hero.vue'
import { ref, onMounted } from 'vue'
import api, { STRAPI_URL } from '../services/api'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const articles = ref([])
const loading = ref(true)

const quickLinks = ref([
  { icon: 'fas fa-users', title: 'ANGGOTA', titleBold: 'FRAKSI', desc: 'Kenali wakil rakyat PKS di DPRD Kota Bandung', link: '/anggota' },
  { icon: 'fas fa-bullhorn', title: 'ASPIRASI', titleBold: 'WARGA', desc: 'Sampaikan aspirasi dan keluhan Anda langsung', link: '/aspirasi/form' },
  { icon: 'fas fa-newspaper', title: 'BERITA', titleBold: 'FRAKSI', desc: 'Update kegiatan dan perjuangan di parlemen', link: '/berita' },
])

const featuredArticle = ref(null)
const sideNews = ref([])

onMounted(async () => {
  try {
    const data = await api.getArticles({ sort: 'date:desc', 'pagination[limit]': 4, populate: '*' })
    articles.value = data || []
    if (articles.value.length > 0) {
      featuredArticle.value = articles.value[0]
      sideNews.value = articles.value.slice(1, 4)
    }
  } catch (e) {
    console.error('Failed to fetch articles:', e)
  } finally {
    loading.value = false
  }
})

const getImageUrl = (article) => {
  const img = article?.image || article?.attributes?.image
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

const getField = (article, field) => {
  return article?.[field] || article?.attributes?.[field] || ''
}

const timeAgo = (dateStr) => {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} menit lalu`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} hari lalu`
  const weeks = Math.floor(days / 7)
  return `${weeks} minggu lalu`
}
</script>

<template>
  <div class="home-view">
    <Hero />

    <!-- Berita Section -->
    <section class="container news-section">
      <div class="section-header" data-reveal="fade-up">
        <img src="https://pks.id/img/logo-pks.png" alt="" class="pks-icon" />
        <h2>Berita Fraksi</h2>
      </div>

      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> Memuat berita...
      </div>

      <div v-else-if="articles.length === 0" class="empty-state" data-reveal="fade-up">
        <i class="fas fa-newspaper"></i>
        <p>Belum ada berita. Tambahkan artikel melalui <a href="http://localhost:1337/admin" target="_blank">Strapi Admin Panel</a>.</p>
      </div>

      <div v-else class="news-layout">
        <router-link :to="`/berita/${featuredArticle.documentId}`" class="news-featured" v-if="featuredArticle" data-reveal="fade-up">
          <div class="featured-img">
            <img v-if="getImageUrl(featuredArticle)" :src="getImageUrl(featuredArticle)" :alt="getField(featuredArticle, 'title')" />
            <div v-else class="img-placeholder"><i class="fas fa-image"></i></div>
          </div>
          <h3>{{ getField(featuredArticle, 'title') }}</h3>
          <span class="news-time">{{ timeAgo(getField(featuredArticle, 'date') || getField(featuredArticle, 'createdAt')) }}</span>
          <p>{{ getField(featuredArticle, 'excerpt') }}</p>
        </router-link>

        <div class="news-sidebar">
          <router-link :to="`/berita/${item.documentId}`" class="sidebar-item" v-for="(item, index) in sideNews" :key="item.id" data-reveal="fade-right" :data-reveal-delay="index * 100">
            <div class="sidebar-img">
              <img v-if="getImageUrl(item)" :src="getImageUrl(item)" :alt="getField(item, 'title')" />
              <div v-else class="img-placeholder-sm"><i class="fas fa-image"></i></div>
            </div>
            <div class="sidebar-text">
              <h4>{{ getField(item, 'title') }}</h4>
              <span class="news-time">{{ timeAgo(getField(item, 'date') || getField(item, 'createdAt')) }}</span>
            </div>
          </router-link>
          <router-link to="/berita" class="btn btn-primary btn-sm" data-reveal="fade-up" data-reveal-delay="300">Berita lainnya <i class="fas fa-chevron-right"></i></router-link>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="container quicklinks-section">
      <div class="quicklinks-grid">
        <router-link :to="item.link" class="quicklink-card" v-for="(item, index) in quickLinks" :key="item.title" data-reveal="fade-up" :data-reveal-delay="index * 150">
          <div class="ql-icon"><i :class="item.icon"></i></div>
          <div class="ql-text">
            <h3>{{ item.title }}<strong>{{ item.titleBold }}</strong></h3>
            <p>{{ item.desc }}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-section { padding: 50px 0 30px; }
.news-layout {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px;
}
.news-featured {
  background: white; border-radius: var(--radius); overflow: hidden;
  padding: 0; box-shadow: var(--shadow-sm);
}
.featured-img { height: 320px; overflow: hidden; border-radius: var(--radius) var(--radius) 0 0; }
.featured-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.news-featured:hover .featured-img img { transform: scale(1.03); }
.news-featured h3 { padding: 20px 24px 8px; font-size: 1.25rem; color: var(--pks-navy); line-height: 1.4; }
.news-featured .news-time { padding: 0 24px; font-size: 0.8rem; color: var(--pks-text-muted); }
.news-featured p { padding: 12px 24px 24px; font-size: 0.9rem; color: var(--pks-text-muted); line-height: 1.7; }

.news-sidebar { display: flex; flex-direction: column; gap: 16px; }
.sidebar-item {
  display: flex; gap: 16px; background: white; border-radius: var(--radius);
  padding: 14px; box-shadow: var(--shadow-sm); transition: var(--transition); cursor: pointer;
}
.sidebar-item:hover { box-shadow: var(--shadow-md); transform: translateX(4px); }
.sidebar-img { width: 110px; min-width: 110px; height: 85px; border-radius: 10px; overflow: hidden; }
.sidebar-img img { width: 100%; height: 100%; object-fit: cover; }
.sidebar-text h4 { font-size: 0.9rem; color: var(--pks-navy); font-weight: 700; line-height: 1.35; margin-bottom: 6px; }
.sidebar-text .news-time { font-size: 0.75rem; color: var(--pks-text-muted); }
.btn-sm { padding: 10px 24px; font-size: 0.85rem; align-self: flex-end; }

/* Quick Links */
.quicklinks-section { padding: 30px 0 50px; }
.quicklinks-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.quicklink-card {
  background: white; border-radius: var(--radius); padding: 28px;
  display: flex; align-items: flex-start; gap: 18px;
  box-shadow: var(--shadow-sm); transition: var(--transition);
  border: 1px solid transparent;
}
.quicklink-card:hover {
  box-shadow: var(--shadow-md); border-color: var(--pks-orange);
  transform: translateY(-4px);
}
.ql-icon {
  width: 50px; height: 50px; min-width: 50px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; color: var(--pks-orange);
  background: rgba(240,122,30,0.08); border-radius: 12px;
}
.ql-text h3 { font-size: 0.95rem; color: var(--pks-text-dark); font-weight: 400; }
.ql-text h3 strong { color: var(--pks-orange); font-weight: 800; }
.ql-text p { font-size: 0.82rem; color: var(--pks-text-muted); margin-top: 4px; }

/* States */
.loading-state, .empty-state { text-align: center; padding: 60px 20px; color: var(--pks-text-muted); }
.loading-state i { font-size: 1.5rem; color: var(--pks-orange); }
.empty-state i { font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block; }
.empty-state a { color: var(--pks-orange); font-weight: 600; }
.img-placeholder, .img-placeholder-sm { width: 100%; height: 100%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
.img-placeholder i { font-size: 3rem; }
.img-placeholder-sm i { font-size: 1.5rem; }

@media (max-width: 992px) {
  .news-layout { grid-template-columns: 1fr; }
  .quicklinks-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 576px) {
  .quicklinks-grid { grid-template-columns: 1fr; }
}
</style>
