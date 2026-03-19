import { useLanguage } from '@/context/LanguageContext'
import { Film, MessageSquare, Bell, Eye } from 'lucide-react'
import { CORAL, TEAL, BG_SOFT, BORDER } from '@/lib/brand'
import { getProjects, getRequests, getSettings } from '@/lib/storage'

export default function AdminDashboard() {
  const { t } = useLanguage()
  const projects = getProjects()
  const requests = getRequests()
  const settings = getSettings()
  const newReqs = requests.filter((r: any) => r.status === 'new')

  const cards = [
    { icon: Film, label: t('admin_total_projects'), value: projects.length, color: CORAL },
    { icon: MessageSquare, label: t('admin_total_requests'), value: requests.length, color: '#60a5fa' },
    { icon: Bell, label: t('admin_new_requests'), value: newReqs.length, color: '#f59e0b' },
    { icon: Eye, label: t('admin_visits'), value: settings.visit_count || 0, color: '#a78bfa' },
  ]

  const recent = [...requests]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8)

  const statusColors: Record<string, string> = {
    new: '#f59e0b', reviewed: '#60a5fa', contacted: CORAL, closed: '#666',
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_overview')}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {cards.map(c => (
          <div key={c.label} style={{ padding: 20, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <c.icon size={18} style={{ color: c.color }} />
              <span style={{ color: '#666', fontSize: 13 }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 200, color: '#fff' }}>{c.value}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 300, color: '#fff', marginBottom: 16 }}>{t('admin_recent')}</h2>
      <div style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {[t('form_name'), t('form_org'), t('form_service'), t('form_phone'), 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'start', color: '#555', fontSize: 12, fontWeight: 400, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#555' }}>No requests yet</td></tr>
              ) : recent.map((r: any) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{r.full_name}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 14 }}>{r.organization}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 14 }}>{r.service_type || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 14 }}>{r.phone}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 3, fontSize: 11, fontWeight: 500,
                      background: `${statusColors[r.status] || '#666'}20`,
                      color: statusColors[r.status] || '#666',
                    }}>{t(`status_${r.status}`)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
