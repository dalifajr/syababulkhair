import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/report-cards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportCardController::index
 * @see app/Http/Controllers/Admin/ReportCardController.php:28
 * @route '/admin/report-cards'
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
* @see \App\Http\Controllers\Admin\ReportCardController::generate
 * @see app/Http/Controllers/Admin/ReportCardController.php:66
 * @route '/admin/report-cards/generate'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/admin/report-cards/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::generate
 * @see app/Http/Controllers/Admin/ReportCardController.php:66
 * @route '/admin/report-cards/generate'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::generate
 * @see app/Http/Controllers/Admin/ReportCardController.php:66
 * @route '/admin/report-cards/generate'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::generate
 * @see app/Http/Controllers/Admin/ReportCardController.php:66
 * @route '/admin/report-cards/generate'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::generate
 * @see app/Http/Controllers/Admin/ReportCardController.php:66
 * @route '/admin/report-cards/generate'
 */
        generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(options),
            method: 'post',
        })
    
    generate.form = generateForm
/**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
export const show = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/report-cards/{reportCard}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
show.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return show.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
show.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
show.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
    const showForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
        showForm.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportCardController::show
 * @see app/Http/Controllers/Admin/ReportCardController.php:211
 * @route '/admin/report-cards/{reportCard}'
 */
        showForm.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
export const edit = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/report-cards/{reportCard}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
edit.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return edit.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
edit.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
edit.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
    const editForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
        editForm.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportCardController::edit
 * @see app/Http/Controllers/Admin/ReportCardController.php:239
 * @route '/admin/report-cards/{reportCard}/edit'
 */
        editForm.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ReportCardController::update
 * @see app/Http/Controllers/Admin/ReportCardController.php:258
 * @route '/admin/report-cards/{reportCard}'
 */
export const update = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/report-cards/{reportCard}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::update
 * @see app/Http/Controllers/Admin/ReportCardController.php:258
 * @route '/admin/report-cards/{reportCard}'
 */
update.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return update.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::update
 * @see app/Http/Controllers/Admin/ReportCardController.php:258
 * @route '/admin/report-cards/{reportCard}'
 */
update.put = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::update
 * @see app/Http/Controllers/Admin/ReportCardController.php:258
 * @route '/admin/report-cards/{reportCard}'
 */
    const updateForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::update
 * @see app/Http/Controllers/Admin/ReportCardController.php:258
 * @route '/admin/report-cards/{reportCard}'
 */
        updateForm.put = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ReportCardController::lock
 * @see app/Http/Controllers/Admin/ReportCardController.php:311
 * @route '/admin/report-cards/{reportCard}/lock'
 */
export const lock = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

lock.definition = {
    methods: ["post"],
    url: '/admin/report-cards/{reportCard}/lock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::lock
 * @see app/Http/Controllers/Admin/ReportCardController.php:311
 * @route '/admin/report-cards/{reportCard}/lock'
 */
lock.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return lock.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::lock
 * @see app/Http/Controllers/Admin/ReportCardController.php:311
 * @route '/admin/report-cards/{reportCard}/lock'
 */
lock.post = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::lock
 * @see app/Http/Controllers/Admin/ReportCardController.php:311
 * @route '/admin/report-cards/{reportCard}/lock'
 */
    const lockForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lock.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::lock
 * @see app/Http/Controllers/Admin/ReportCardController.php:311
 * @route '/admin/report-cards/{reportCard}/lock'
 */
        lockForm.post = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lock.url(args, options),
            method: 'post',
        })
    
    lock.form = lockForm
/**
* @see \App\Http\Controllers\Admin\ReportCardController::unlock
 * @see app/Http/Controllers/Admin/ReportCardController.php:319
 * @route '/admin/report-cards/{reportCard}/unlock'
 */
export const unlock = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unlock.url(args, options),
    method: 'post',
})

unlock.definition = {
    methods: ["post"],
    url: '/admin/report-cards/{reportCard}/unlock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::unlock
 * @see app/Http/Controllers/Admin/ReportCardController.php:319
 * @route '/admin/report-cards/{reportCard}/unlock'
 */
unlock.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return unlock.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::unlock
 * @see app/Http/Controllers/Admin/ReportCardController.php:319
 * @route '/admin/report-cards/{reportCard}/unlock'
 */
unlock.post = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unlock.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::unlock
 * @see app/Http/Controllers/Admin/ReportCardController.php:319
 * @route '/admin/report-cards/{reportCard}/unlock'
 */
    const unlockForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unlock.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::unlock
 * @see app/Http/Controllers/Admin/ReportCardController.php:319
 * @route '/admin/report-cards/{reportCard}/unlock'
 */
        unlockForm.post = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unlock.url(args, options),
            method: 'post',
        })
    
    unlock.form = unlockForm
/**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
export const print = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/admin/report-cards/{reportCard}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
print.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return print.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
print.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
print.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
    const printForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: print.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
        printForm.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportCardController::print
 * @see app/Http/Controllers/Admin/ReportCardController.php:327
 * @route '/admin/report-cards/{reportCard}/print'
 */
        printForm.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    print.form = printForm
const reportCards = {
    index: Object.assign(index, index),
generate: Object.assign(generate, generate),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
lock: Object.assign(lock, lock),
unlock: Object.assign(unlock, unlock),
print: Object.assign(print, print),
}

export default reportCards