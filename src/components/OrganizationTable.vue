<template>
    <div style="height: 100vh">
        <ag-grid-vue
            style="width: 100%; height: 100%"
            class="ag-theme-alpine-dark"
            :columnDefs="columnDefs"
            @grid-ready="onGridReady"
            :defaultColDef="defaultColDef"
            :rowSelection="rowSelection"
            :rowModelType="rowModelType"
            :datasource="datasource"
            :cacheBlockSize="cacheBlockSize"
            :cacheOverflowSize="cacheOverflowSize"
            :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
            :infiniteInitialRowCount="infiniteInitialRowCount"
            :maxBlocksInCache="maxBlocksInCache"
            :getRowId="getRowId"
            :onRowClicked="onRowClicked"
        />
    </div>
</template>

<script lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import { getAllRepositoriesFromOrganization } from '../api/github'
import type {
    GridReadyEvent,
    IGetRowsParams,
    IServerSideGetRowsParams,
    RowClickedEvent,
} from 'ag-grid-community'
import type { GithubRepositorySearchResult } from '@/types/github'
import router from '@/router'

export default {
    name: 'App',
    props: ['organization'],
    components: {
        'ag-grid-vue': AgGridVue,
    },
    data: function () {
        return {
            columnDefs: [
                { field: 'name', filter: 'agTextColumnFilter', sort: 'desc' },
            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                sortable: true,
                resizable: true,
                floatingFilter: true,
            },
            rowSelection: 'multiple',
            rowModelType: 'infinite',
            cacheBlockSize: 50,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 2,
            infiniteInitialRowCount: 1,
            maxBlocksInCache: 2,
            getRowId: null,
            datasource: {
                getRows: async ({
                    startRow,
                    endRow,
                    successCallback,
                    failCallback,
                    filterModel,
                    sortModel,
                }: IGetRowsParams) => {
                    if (
                        !(
                            Number.isInteger(startRow) &&
                            Number.isInteger(endRow)
                        )
                    ) {
                        failCallback()
                        return
                    }

                    const rowsPerPage = 50 // has to be same as cacheBlockSize
                    const calculatedPageNumber = Math.ceil(endRow / rowsPerPage)

                    const searchQuery = filterModel.name
                        ? filterModel.name.filter
                        : null

                    const sorting = sortModel.length
                        ? sortModel.filter((sort) => sort.colId == 'name')[0]
                              .sort
                        : 'desc'

                    // At this point in your code, you would call the server.
                    // To make the demo look real, wait for 500ms before returning
                    getAllRepositoriesFromOrganization({
                        per_page: rowsPerPage,
                        organization: this.organization,
                        direction: sorting,
                        page: calculatedPageNumber,
                        ...(searchQuery && { searchQuery }),
                    }).then((data) => {
                        if (data.data) {
                            successCallback(
                                data.data.items,
                                data.data.total_count
                            )
                        } else {
                            failCallback()
                        }
                    })
                },
            },
        }
    },
    created() {
        this.getRowId = (params: { data: GithubRepositorySearchResult }) => {
            return params.data.id
        }
    },
    methods: {
        onGridReady: function (params: GridReadyEvent) {
            this.gridApi = params.api
            this.gridColumnApi = params.columnApi
        },
        dataSource: () => {
            return {
                getRows: async ({
                    request,
                    success,
                    fail,
                    ...rest
                }: IServerSideGetRowsParams) => {
                    const { startRow, endRow } = request
                    console.log(startRow, endRow, rest)
                    if (
                        !(
                            Number.isInteger(startRow) &&
                            Number.isInteger(endRow)
                        )
                    ) {
                        fail()
                        return
                    }

                    const offset = startRow
                    const limit = (endRow as number) - (startRow as number)
                    const rowsPerPage = 10
                    // At this point in your code, you would call the server.
                    // To make the demo look real, wait for 500ms before returning
                    getAllRepositoriesFromOrganization({
                        per_page: rowsPerPage,
                        organization: this.organization || '',
                        direction: 'desc',
                        page: (endRow as number) / rowsPerPage,
                    }).then((data) => {
                        // call the success callback
                        success({
                            rowData: data.data.items,
                            rowCount: data.data.total_count,
                        })
                    })
                },
            }
        },
        onRowClicked: function (
            event: RowClickedEvent<GithubRepositorySearchResult>
        ) {
            if (event.data?.name) {
                router.push({
                    name: 'repository',
                    params: {
                        organization: this.organization,
                        repository: event.data.name,
                    },
                })
            }
        },
    },
}
</script>
