import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:17
 * @route '/admin/students'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/students/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::create
 * @see app/Http/Controllers/Admin/StudentController.php:41
 * @route '/admin/students/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:46
 * @route '/admin/students'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:46
 * @route '/admin/students'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:46
 * @route '/admin/students'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:46
 * @route '/admin/students'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:46
 * @route '/admin/students'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
export const edit = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/students/{student}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
edit.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return edit.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
edit.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
edit.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
    const editForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
        editForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::edit
 * @see app/Http/Controllers/Admin/StudentController.php:83
 * @route '/admin/students/{student}/edit'
 */
        editForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:90
 * @route '/admin/students/{student}'
 */
export const update = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:90
 * @route '/admin/students/{student}'
 */
update.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:90
 * @route '/admin/students/{student}'
 */
update.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:90
 * @route '/admin/students/{student}'
 */
    const updateForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:90
 * @route '/admin/students/{student}'
 */
        updateForm.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:131
 * @route '/admin/students/{student}'
 */
export const destroy = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:131
 * @route '/admin/students/{student}'
 */
destroy.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:131
 * @route '/admin/students/{student}'
 */
destroy.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:131
 * @route '/admin/students/{student}'
 */
    const destroyForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:131
 * @route '/admin/students/{student}'
 */
        destroyForm.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
export const template = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/admin/students/template/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
    const templateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
        templateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::template
 * @see app/Http/Controllers/Admin/StudentController.php:142
 * @route '/admin/students/template/download'
 */
        templateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
/**
* @see \App\Http\Controllers\Admin\StudentController::importMethod
 * @see app/Http/Controllers/Admin/StudentController.php:177
 * @route '/admin/students/import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/admin/students/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::importMethod
 * @see app/Http/Controllers/Admin/StudentController.php:177
 * @route '/admin/students/import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::importMethod
 * @see app/Http/Controllers/Admin/StudentController.php:177
 * @route '/admin/students/import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::importMethod
 * @see app/Http/Controllers/Admin/StudentController.php:177
 * @route '/admin/students/import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::importMethod
 * @see app/Http/Controllers/Admin/StudentController.php:177
 * @route '/admin/students/import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
const students = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
template: Object.assign(template, template),
import: Object.assign(importMethod, importMethod),
}

export default students