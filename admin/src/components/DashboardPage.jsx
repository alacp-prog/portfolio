import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import ProjectsPanel from './ProjectsPanel'
import SkillsPanel from './SkillsPanel'
import ProjectFormDrawer from './ProjectFormDrawer'
import SkillFormDrawer from './SkillFormDrawer'
import { fadeInUp } from '../lib/motion'
import { useAuth } from '../context/AuthContext'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../services/api'

const VALID_TABS = ['projects', 'skills']

export default function DashboardPage() {
  const { tab } = useParams()
  const { user } = useAuth()
  const canEdit = user?.role === 'admin' || user?.role === 'editor'

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [projectDrawer, setProjectDrawer] = useState(null) // null | 'new' | project object
  const [skillDrawer, setSkillDrawer] = useState(null) // null | 'new' | skill object
  const [saving, setSaving] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      const [projectsRes, skillsRes] = await Promise.all([getProjects(), getSkills()])
      setProjects(projectsRes.data ?? [])
      setSkills(skillsRes.data ?? [])
      setLoadError(null)
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveProject(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (projectDrawer && projectDrawer !== 'new') {
        await updateProject(projectDrawer.id, data)
      } else {
        await createProject(data)
      }
      await loadAll()
      setProjectDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteProject(project) {
    if (!window.confirm(`Supprimer le projet "${project.title}" ?`)) return
    try {
      await deleteProject(project.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  async function handleSaveSkill(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (skillDrawer && skillDrawer !== 'new') {
        await updateSkill(skillDrawer.id, data)
      } else {
        await createSkill(data)
      }
      await loadAll()
      setSkillDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSkill(skill) {
    if (!window.confirm(`Supprimer la compétence "${skill.name}" ?`)) return
    try {
      await deleteSkill(skill.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  if (!VALID_TABS.includes(tab)) {
    return <Navigate to="/dashboard/projects" replace />
  }

  function closeAnyPanel() {
    setProjectDrawer(null)
    setSkillDrawer(null)
    setFormErrors(null)
  }

  return (
    <>
      <AnimatePresence>
        {loadError && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-center gap-2 overflow-hidden rounded-xl border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger"
          >
            <WarningCircle size={16} weight="fill" className="flex-none" />
            Impossible de contacter l'API : {loadError}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={tab} variants={fadeInUp} initial="hidden" animate="show" exit="exit">
          {tab === 'projects' && (
            <ProjectsPanel
              projects={projects}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setProjectDrawer('new')}
              onEdit={(p) => setProjectDrawer(p)}
              onDelete={handleDeleteProject}
            />
          )}

          {tab === 'skills' && (
            <SkillsPanel
              skills={skills}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setSkillDrawer('new')}
              onEdit={(s) => setSkillDrawer(s)}
              onDelete={handleDeleteSkill}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {projectDrawer !== null && (
          <ProjectFormDrawer
            key={projectDrawer === 'new' ? 'new-project' : projectDrawer.id}
            project={projectDrawer === 'new' ? null : projectDrawer}
            onSave={handleSaveProject}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
        {skillDrawer !== null && (
          <SkillFormDrawer
            key={skillDrawer === 'new' ? 'new-skill' : skillDrawer.id}
            skill={skillDrawer === 'new' ? null : skillDrawer}
            onSave={handleSaveSkill}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
      </AnimatePresence>
    </>
  )
}
