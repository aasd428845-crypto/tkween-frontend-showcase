import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Search, Trash2, X } from 'lucide-react'

interface TkweenRequest {
  id: string
  full_name: string
  organization: string
  service_type: string
  event_date: string
  location: string
  details: string
  phone: string
  email: string
  status: 'new' | 'reviewed' | 'contacted' | 'closed'
  created_at: string
}

function loadRequests(): TkweenRequest[] {
  try { return JSON.parse(localStorage.getItem('tkween_requests') || '[]') } catch { return [] }
}
function saveRequests(r: TkweenRequest[]) {
  localStorage.setItem('tkween_requests', JSON.stringify(r))
}

const statusColors: Record<string, string> = {
  new: '#f59e0b', reviewed: '#60a5fa', contacted: '#FF3B30', closed: '#555',
}

export default function AdminRequests() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState(loadRequests)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<TkweenRequest | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const save = (r: TkweenRequest[]) => { setRequests(r); saveRequests(r) }

  const filtered = requests
    .filter(r => filter === 'ALL' || r.status === filter)
    .filter(r => !search || r.full_name.toLowerCase().includes(search.toLowerCase()) || r.organization.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const updateStatus = (id: string, status: TkweenRequest['status']) => {
    const updated = requests.map(r => r.id === id ? { ...r, status } : r)
    save(updated)
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  const handleDelete = (id: string) => {
    save(requests.filter(r => r.id !== id))
    if (selected?.id === id) setSelected(null)
    setConfirmDelete(null)
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 300, color: '#fff', marginBottom: 24 }}>{t('admin_requests')}</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {['ALL', 'new', 'reviewed', 'contacted', 'closed'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '6px 16px', borderRadius: 4,
            border: filter === s ? 'none' : '1px solid #1c1c1c',
            background: filter === s ? '#FF3B30' : 'transparent',
            color: filter === s ? '#fff' : '#888',
            fontSize: 12, cursor: 'pointer',
          }}>
            {s === 'ALL' ? 'ALL' : t(`status_${s}`)}
          </button>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24,
        background: '#0a0a0a', border: '1px solid #1c1c1c', borderRadius: 6, padding: '0 12px',
      }}>
        <Search size={16} style={{ color: '#555' }}/>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('admin_search')}
          style={{ flex: 1, padding: '10px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: 14, outline: 'none' }}/>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, background: '#0a0a0a', border: '1px solid #1c1c1c', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                  {[t('form_name'), t('form_org'), t('form_phone'), 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'start', color: '#555', fontSize: 12, fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: '#555' }}>No requests</td></tr>
                ) : filtered.map(r => (
                  <tr key={r.id} onClick={() => setSelected(r)} style={{
                    borderBottom: '1px solid #1c1c1c', cursor: 'pointer',
                    background: selected?.id === r.id ? 'rgba(255,59,48,0.04)' : 'transparent',
                  }}>
                    <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{r.full_name}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 14 }}>{r.organization}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 14 }}>{r.phone}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: 3, fontSize: 11,
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

        {selected && (
          <div className="hidden lg:block" style={{
            width: 340, background: '#0a0a0a', border: '1px solid #1c1c1c',
            borderRadius: 6, padding: 24, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 400, color: '#fff' }}>{selected.full_name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}><X size={18}/></button>
            </div>
            {[
              { label: t('form_org'), value: selected.organization },
              { label: t('form_service'), value: selected.service_type || '-' },
              { label: t('form_date'), value: selected.event_date || '-' },
              { label: t('form_location'), value: selected.location || '-' },
              { label: t('form_phone'), value: selected.phone },
              { label: t('form_email'), value: selected.email || '-' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <span style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 2 }}>{f.label.toUpperCase()}</span>
                <span style={{ color: '#fff', fontSize: 14 }}>{f.value}</span>
              </div>
            ))}
            {selected.details && (
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: '#555', fontSize: 10, letterSpacing: '0.1em', display: 'block', marginBottom: 2 }}>{t('form_details').toUpperCase()}</span>
                <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.6 }}>{selected.details}</p>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {(['new', 'reviewed', 'contacted', 'closed'] as const).map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} style={{
                  padding: '5px 12px', borderRadius: 4, fontSize: 12, cursor: 'pointer',
                  border: selected.status === s ? 'none' : '1px solid #1c1c1c',
                  background: selected.status === s ? statusColors[s] : 'transparent',
                  color: selected.status === s ? '#fff' : statusColors[s],
                }}>{t(`status_${s}`)}</button>
              ))}
            </div>
            <button onClick={() => setConfirmDelete(selected.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#ef4444', background: 'none', border: 'none', fontSize: 13, cursor: 'pointer',
            }}>
              <Trash2 size={14}/> {t('admin_delete')}
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 24, background: '#0a0a0a', border: '1px solid #1c1c1c', borderRadius: 8 }}>
            <p style={{ color: '#fff', marginBottom: 20 }}>{t('admin_confirm_delete')}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => handleDelete(confirmDelete)} style={{ padding: '8px 20px', background: '#ef4444', color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}>{t('admin_delete')}</button>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #1c1c1c', color: '#888', borderRadius: 4, cursor: 'pointer' }}>{t('admin_cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
