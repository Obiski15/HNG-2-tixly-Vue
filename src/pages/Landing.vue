<script setup lang="ts">
import { CheckCircle2, Clock, TrendingUp, Users } from "lucide-vue-next";
import { useRouter } from "vue-router";
import WavyBackground from "@/components/homepage/WavyBackground.vue";
import Layout from "@/components/Layout.vue";
import Button from "@/components/ui/button.vue";
import Card from "@/components/ui/Card.vue";

const router = useRouter();
</script>

<template>
  <Layout>
    <section class="gradient-hero relative overflow-hidden py-20 lg:py-32">
      <div class="container-app relative z-10">
        <div class="mx-auto max-w-3xl text-center">
          <h1
            class="text-primary-foreground mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Streamline Your Ticket Management
          </h1>
          <p
            class="text-primary-foreground/90 mb-8 text-lg leading-relaxed md:text-xl"
          >
            Track, manage, and resolve support tickets efficiently with Tixly.
            Built for teams that value clarity and speed.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              @click="router.push('/signup')"
              class="text-primary bg-white px-8 text-lg shadow-lg hover:bg-white/90"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              @click="router.push('/login')"
              class="border-white/30 bg-white/10 px-8 text-lg text-white hover:bg-white/20"
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      <WavyBackground />
    </section>

    <section class="bg-background py-20">
      <div class="container-app">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need
          </h2>
          <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
            Powerful features to help your team stay organized and productive
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card as="Root" class="shadow-md transition-shadow hover:shadow-lg">
            <Card as="Header">
              <CheckCircle2 class="text-success mb-4 h-12 w-12" />
              <Card as="Title">Easy Tracking</Card>
              <Card as="Description">
                Monitor all your tickets in one centralized dashboard
              </Card>
            </Card>
          </Card>

          <Card as="Root" class="shadow-md transition-shadow hover:shadow-lg">
            <Card as="Header">
              <Clock class="text-warning mb-4 h-12 w-12" />
              <Card as="Title">Real-time Updates</Card>
              <Card as="Description">
                Stay informed with instant status changes and notifications
              </Card>
            </Card>
          </Card>

          <Card as="Root" class="shadow-md transition-shadow hover:shadow-lg">
            <Card as="Header">
              <TrendingUp class="text-primary mb-4 h-12 w-12" />
              <Card as="Title">Analytics</Card>
              <Card as="Description">
                Gain insights with comprehensive ticket statistics
              </Card>
            </Card>
          </Card>

          <Card as="Root" class="shadow-md transition-shadow hover:shadow-lg">
            <Card as="Header">
              <Users class="text-accent mb-4 h-12 w-12" />
              <Card as="Title">Team Collaboration</Card>
              <Card as="Description">
                Work together seamlessly on ticket resolution
              </Card>
            </Card>
          </Card>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden py-20">
      <div class="container-app relative z-10">
        <Card as="Root" class="mx-auto max-w-3xl shadow-xl">
          <Card as="Content" class="p-12 text-center">
            <h2 class="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Get Started?
            </h2>
            <p class="text-muted-foreground mb-8 text-lg">
              Join teams who trust Tixly for their support operations
            </p>
            <Button
              size="lg"
              @click="router.push('/signup')"
              class="px-8 text-lg"
            >
              Create Your Account
            </Button>
          </Card>
        </Card>
      </div>
    </section>
  </Layout>
</template>
