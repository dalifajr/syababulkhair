import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/extracurriculars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::index
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:18
 * @route '/admin/extracurriculars'
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
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/extracurriculars/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::create
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:30
 * @route '/admin/extracurriculars/create'
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
* @see \App\Http\Controllers\Admin\ExtracurricularController::store
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:44
 * @route '/admin/extracurriculars'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/extracurriculars',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::store
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:44
 * @route '/admin/extracurriculars'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::store
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:44
 * @route '/admin/extracurriculars'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::store
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:44
 * @route '/admin/extracurriculars'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::store
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:44
 * @route '/admin/extracurriculars'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
export const edit = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/extracurriculars/{extracurricular}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
edit.url = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { extracurricular: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: typeof args.extracurricular === 'object'
                ? args.extracurricular.id
                : args.extracurricular,
                }

    return edit.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
edit.get = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
edit.head = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
    const editForm = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
        editForm.get = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::edit
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:62
 * @route '/admin/extracurriculars/{extracurricular}/edit'
 */
        editForm.head = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ExtracurricularController::update
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:99
 * @route '/admin/extracurriculars/{extracurricular}'
 */
export const update = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/extracurriculars/{extracurricular}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::update
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:99
 * @route '/admin/extracurriculars/{extracurricular}'
 */
update.url = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { extracurricular: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: typeof args.extracurricular === 'object'
                ? args.extracurricular.id
                : args.extracurricular,
                }

    return update.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::update
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:99
 * @route '/admin/extracurriculars/{extracurricular}'
 */
update.put = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::update
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:99
 * @route '/admin/extracurriculars/{extracurricular}'
 */
    const updateForm = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::update
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:99
 * @route '/admin/extracurriculars/{extracurricular}'
 */
        updateForm.put = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ExtracurricularController::destroy
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:117
 * @route '/admin/extracurriculars/{extracurricular}'
 */
export const destroy = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/extracurriculars/{extracurricular}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::destroy
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:117
 * @route '/admin/extracurriculars/{extracurricular}'
 */
destroy.url = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { extracurricular: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: typeof args.extracurricular === 'object'
                ? args.extracurricular.id
                : args.extracurricular,
                }

    return destroy.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::destroy
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:117
 * @route '/admin/extracurriculars/{extracurricular}'
 */
destroy.delete = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::destroy
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:117
 * @route '/admin/extracurriculars/{extracurricular}'
 */
    const destroyForm = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::destroy
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:117
 * @route '/admin/extracurriculars/{extracurricular}'
 */
        destroyForm.delete = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ExtracurricularController::enroll
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:125
 * @route '/admin/extracurriculars/{extracurricular}/enroll'
 */
export const enroll = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

enroll.definition = {
    methods: ["post"],
    url: '/admin/extracurriculars/{extracurricular}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::enroll
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:125
 * @route '/admin/extracurriculars/{extracurricular}/enroll'
 */
enroll.url = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { extracurricular: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: typeof args.extracurricular === 'object'
                ? args.extracurricular.id
                : args.extracurricular,
                }

    return enroll.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::enroll
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:125
 * @route '/admin/extracurriculars/{extracurricular}/enroll'
 */
enroll.post = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::enroll
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:125
 * @route '/admin/extracurriculars/{extracurricular}/enroll'
 */
    const enrollForm = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enroll.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::enroll
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:125
 * @route '/admin/extracurriculars/{extracurricular}/enroll'
 */
        enrollForm.post = (args: { extracurricular: number | { id: number } } | [extracurricular: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enroll.url(args, options),
            method: 'post',
        })
    
    enroll.form = enrollForm
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::updateEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:148
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
export const updateEnrollment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEnrollment.url(args, options),
    method: 'put',
})

updateEnrollment.definition = {
    methods: ["put"],
    url: '/admin/extracurricular-enrollments/{enrollment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::updateEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:148
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
updateEnrollment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return updateEnrollment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::updateEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:148
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
updateEnrollment.put = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEnrollment.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::updateEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:148
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
    const updateEnrollmentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateEnrollment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::updateEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:148
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
        updateEnrollmentForm.put = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateEnrollment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateEnrollment.form = updateEnrollmentForm
/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::removeEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:160
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
export const removeEnrollment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeEnrollment.url(args, options),
    method: 'delete',
})

removeEnrollment.definition = {
    methods: ["delete"],
    url: '/admin/extracurricular-enrollments/{enrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::removeEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:160
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
removeEnrollment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return removeEnrollment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExtracurricularController::removeEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:160
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
removeEnrollment.delete = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeEnrollment.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::removeEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:160
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
    const removeEnrollmentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeEnrollment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExtracurricularController::removeEnrollment
 * @see app/Http/Controllers/Admin/ExtracurricularController.php:160
 * @route '/admin/extracurricular-enrollments/{enrollment}'
 */
        removeEnrollmentForm.delete = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeEnrollment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeEnrollment.form = removeEnrollmentForm
const ExtracurricularController = { index, create, store, edit, update, destroy, enroll, updateEnrollment, removeEnrollment }

export default ExtracurricularController