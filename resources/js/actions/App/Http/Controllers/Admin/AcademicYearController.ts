import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/academic-years',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::index
 * @see app/Http/Controllers/Admin/AcademicYearController.php:12
 * @route '/admin/academic-years'
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
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/academic-years/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::create
 * @see app/Http/Controllers/Admin/AcademicYearController.php:29
 * @route '/admin/academic-years/create'
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
* @see \App\Http\Controllers\Admin\AcademicYearController::store
 * @see app/Http/Controllers/Admin/AcademicYearController.php:34
 * @route '/admin/academic-years'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/academic-years',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::store
 * @see app/Http/Controllers/Admin/AcademicYearController.php:34
 * @route '/admin/academic-years'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::store
 * @see app/Http/Controllers/Admin/AcademicYearController.php:34
 * @route '/admin/academic-years'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::store
 * @see app/Http/Controllers/Admin/AcademicYearController.php:34
 * @route '/admin/academic-years'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::store
 * @see app/Http/Controllers/Admin/AcademicYearController.php:34
 * @route '/admin/academic-years'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
export const edit = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/academic-years/{academicYear}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
edit.url = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academicYear: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academicYear: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academicYear: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academicYear: typeof args.academicYear === 'object'
                ? args.academicYear.id
                : args.academicYear,
                }

    return edit.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
edit.get = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
edit.head = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
    const editForm = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
        editForm.get = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::edit
 * @see app/Http/Controllers/Admin/AcademicYearController.php:54
 * @route '/admin/academic-years/{academicYear}/edit'
 */
        editForm.head = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\AcademicYearController::update
 * @see app/Http/Controllers/Admin/AcademicYearController.php:61
 * @route '/admin/academic-years/{academicYear}'
 */
export const update = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/academic-years/{academicYear}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::update
 * @see app/Http/Controllers/Admin/AcademicYearController.php:61
 * @route '/admin/academic-years/{academicYear}'
 */
update.url = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academicYear: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academicYear: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academicYear: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academicYear: typeof args.academicYear === 'object'
                ? args.academicYear.id
                : args.academicYear,
                }

    return update.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::update
 * @see app/Http/Controllers/Admin/AcademicYearController.php:61
 * @route '/admin/academic-years/{academicYear}'
 */
update.put = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::update
 * @see app/Http/Controllers/Admin/AcademicYearController.php:61
 * @route '/admin/academic-years/{academicYear}'
 */
    const updateForm = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::update
 * @see app/Http/Controllers/Admin/AcademicYearController.php:61
 * @route '/admin/academic-years/{academicYear}'
 */
        updateForm.put = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\AcademicYearController::destroy
 * @see app/Http/Controllers/Admin/AcademicYearController.php:81
 * @route '/admin/academic-years/{academicYear}'
 */
export const destroy = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/academic-years/{academicYear}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::destroy
 * @see app/Http/Controllers/Admin/AcademicYearController.php:81
 * @route '/admin/academic-years/{academicYear}'
 */
destroy.url = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academicYear: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academicYear: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academicYear: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academicYear: typeof args.academicYear === 'object'
                ? args.academicYear.id
                : args.academicYear,
                }

    return destroy.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AcademicYearController::destroy
 * @see app/Http/Controllers/Admin/AcademicYearController.php:81
 * @route '/admin/academic-years/{academicYear}'
 */
destroy.delete = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AcademicYearController::destroy
 * @see app/Http/Controllers/Admin/AcademicYearController.php:81
 * @route '/admin/academic-years/{academicYear}'
 */
    const destroyForm = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AcademicYearController::destroy
 * @see app/Http/Controllers/Admin/AcademicYearController.php:81
 * @route '/admin/academic-years/{academicYear}'
 */
        destroyForm.delete = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AcademicYearController = { index, create, store, edit, update, destroy }

export default AcademicYearController