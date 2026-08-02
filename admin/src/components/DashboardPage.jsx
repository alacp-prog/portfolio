import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import ProjectsPanel from './ProjectsPanel'
import SkillsPanel from './SkillsPanel'
import ServicesPanel from './ServicesPanel'
import CategoriesPanel from './CategoriesPanel'
import SolutionsPanel from './SolutionsPanel'
import ServiceSolutionsPanel from './ServiceSolutionsPanel'
import ProjectFormDrawer from './ProjectFormDrawer'
import SkillFormDrawer from './SkillFormDrawer'
import ServiceFormDrawer from './ServiceFormDrawer'
import CategoryFormDrawer from './CategoryFormDrawer'
import SolutionFormDrawer from './SolutionFormDrawer'
import ServiceSolutionFormDrawer from './ServiceSolutionFormDrawer'
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
  getServices,
  createService,
  updateService,
  deleteService,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSolutions,
  createSolution,
  updateSolution,
  deleteSolution,
  getServiceSolutions,
  createServiceSolution,
  updateServiceSolution,
  deleteServiceSolution,
} from '../services/api'

const VALID_TABS = ['projects', 'skills', 'services', 'categories', 'solutions', 'relations']

export default function DashboardPage() {
  const { tab } = useParams()
  const { user } = useAuth()
  const canEdit = user?.role === 'admin' || user?.role === 'editor'

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [solutions, setSolutions] = useState([])
  const [serviceSolutions, setServiceSolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [projectDrawer, setProjectDrawer] = useState(null) // null | 'new' | project object
  const [skillDrawer, setSkillDrawer] = useState(null) // null | 'new' | skill object
  const [serviceDrawer, setServiceDrawer] = useState(null) // null | 'new' | service object
  const [categoryDrawer, setCategoryDrawer] = useState(null) // null | 'new' | category object
  const [solutionDrawer, setSolutionDrawer] = useState(null) // null | 'new' | solution object
  const [relationDrawer, setRelationDrawer] = useState(null) // null | 'new' | relation object
  const [saving, setSaving] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      const [projectsRes, skillsRes, servicesRes, categoriesRes, solutionsRes, relationsRes] = await Promise.all([
        getProjects(),
        getSkills(),
        getServices(),
        getCategories(),
        getSolutions(),
        getServiceSolutions(),
      ])
      setProjects(projectsRes.data ?? [])
      setSkills(skillsRes.data ?? [])
      setServices(servicesRes.data ?? [])
      setCategories(categoriesRes.data ?? [])
      setSolutions(solutionsRes.data ?? [])
      setServiceSolutions(relationsRes.data ?? [])
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

  async function handleSaveService(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (serviceDrawer && serviceDrawer !== 'new') {
        await updateService(serviceDrawer.id, data)
      } else {
        await createService(data)
      }
      await loadAll()
      setServiceDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteService(service) {
    if (!window.confirm(`Supprimer le service "${service.name}" ?`)) return
    try {
      await deleteService(service.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  async function handleSaveCategory(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (categoryDrawer && categoryDrawer !== 'new') {
        await updateCategory(categoryDrawer.id, data)
      } else {
        await createCategory(data)
      }
      await loadAll()
      setCategoryDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteCategory(category) {
    if (!window.confirm(`Supprimer la catégorie "${category.name}" ?`)) return
    try {
      await deleteCategory(category.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  async function handleSaveSolution(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (solutionDrawer && solutionDrawer !== 'new') {
        await updateSolution(solutionDrawer.id, data)
      } else {
        await createSolution(data)
      }
      await loadAll()
      setSolutionDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSolution(solution) {
    if (!window.confirm(`Supprimer la solution "${solution.name}" ?`)) return
    try {
      await deleteSolution(solution.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  async function handleSaveRelation(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (relationDrawer && relationDrawer !== 'new') {
        await updateServiceSolution(relationDrawer.id, data)
      } else {
        await createServiceSolution(data)
      }
      await loadAll()
      setRelationDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteRelation(relation) {
    if (!window.confirm(`Supprimer la relation "${relation.service_name} ↔ ${relation.solution_name}" ?`)) return
    try {
      await deleteServiceSolution(relation.id)
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
    setServiceDrawer(null)
    setCategoryDrawer(null)
    setSolutionDrawer(null)
    setRelationDrawer(null)
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

          {tab === 'services' && (
            <ServicesPanel
              services={services}
              categoriesCount={categories.length}
              solutionsCount={solutions.length}
              relationsCount={serviceSolutions.length}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setServiceDrawer('new')}
              onEdit={(s) => setServiceDrawer(s)}
              onDelete={handleDeleteService}
            />
          )}

          {tab === 'categories' && (
            <CategoriesPanel
              categories={categories}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setCategoryDrawer('new')}
              onEdit={(c) => setCategoryDrawer(c)}
              onDelete={handleDeleteCategory}
            />
          )}

          {tab === 'solutions' && (
            <SolutionsPanel
              solutions={solutions}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setSolutionDrawer('new')}
              onEdit={(s) => setSolutionDrawer(s)}
              onDelete={handleDeleteSolution}
            />
          )}

          {tab === 'relations' && (
            <ServiceSolutionsPanel
              relations={serviceSolutions}
              services={services}
              loading={loading}
              canEdit={canEdit}
              onNew={() => setRelationDrawer('new')}
              onEdit={(r) => setRelationDrawer(r)}
              onDelete={handleDeleteRelation}
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
        {serviceDrawer !== null && (
          <ServiceFormDrawer
            key={serviceDrawer === 'new' ? 'new-service' : serviceDrawer.id}
            service={serviceDrawer === 'new' ? null : serviceDrawer}
            categories={categories}
            onSave={handleSaveService}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
        {categoryDrawer !== null && (
          <CategoryFormDrawer
            key={categoryDrawer === 'new' ? 'new-category' : categoryDrawer.id}
            category={categoryDrawer === 'new' ? null : categoryDrawer}
            onSave={handleSaveCategory}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
        {solutionDrawer !== null && (
          <SolutionFormDrawer
            key={solutionDrawer === 'new' ? 'new-solution' : solutionDrawer.id}
            solution={solutionDrawer === 'new' ? null : solutionDrawer}
            onSave={handleSaveSolution}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
        {relationDrawer !== null && (
          <ServiceSolutionFormDrawer
            key={relationDrawer === 'new' ? 'new-relation' : relationDrawer.id}
            relation={relationDrawer === 'new' ? null : relationDrawer}
            services={services}
            solutions={solutions}
            onSave={handleSaveRelation}
            onCancel={closeAnyPanel}
            saving={saving}
            errors={formErrors}
          />
        )}
      </AnimatePresence>
    </>
  )
}
