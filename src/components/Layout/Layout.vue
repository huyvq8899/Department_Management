<template>
    <div class="layout">
        <aside class="sidebar">
            <ul>
                <li>
                    <router-link to="/" exact-active-class="active" class="menu-item">
                        <i class="fas fa-home"></i> Home
                    </router-link>
                </li>
                <li>
                    <router-link to="/departments" exact-active-class="active" class="menu-item">
                        <i class="fas fa-building"></i> Departments
                    </router-link>
                </li>
                <!-- Add more menu items as needed -->
            </ul>
            <!-- Logout button fixed to bottom-right corner -->
            <button @click="logout" class="logout-button">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </aside>

        <!-- Notification Component -->

        <main class="content">
            <router-view></router-view> <!-- Display content of nested routes -->
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LayoutView',

    setup() {
        const router = useRouter();

        const logout = async () => {
            // Show notification

            // Wait for the notification to be rendered
            await nextTick();

            // Clear authentication status from localStorage
            localStorage.removeItem('isLoggedIn');

            // Redirect to login page
            router.push('/login').catch(err => {
                console.error(err);
            });
        };

        return {
            logout
        };
    },
});
</script>

<style lang="scss">
.layout {
    display: flex;
    max-height: 90vh;

    .sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        height: 93.6vh;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        position: relative;

        ul {
            list-style-type: none;
            padding: 0;

            li {
                margin-bottom: 10px;

                .menu-item {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: white;
                    padding: 10px;
                    border-radius: 4px;
                    transition: background-color 0.3s;

                    i {
                        margin-right: 10px;
                    }

                    &.active {
                        background-color: #3498db;
                    }

                    &:hover {
                        background-color: #34495e;
                    }
                }
            }
        }

        .logout-button {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background-color: #e74c3c;
            border: none;
            color: white;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;

            i {
                margin-right: 10px;
            }

            &:hover {
                background-color: #c0392b;
            }
        }
    }

    .content {
        flex: 1;
        padding: 20px;
    }
}
</style>
